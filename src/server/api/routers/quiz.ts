import { z } from "zod";
import { sortBy } from "lodash";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const quizInput = z.object({
  title: z.string(),
  questions: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
      description: z.string(),
      correctAnswer: z.number(),
      answers: z.array(
        z.object({
          id: z.string(),
          text: z.string(),
          order: z.number(),
        })
      ),
    })
  ),
});

export const quizRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.quiz.findMany({
      include: { questions: { include: { answers: true } } },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.union([z.string(), z.array(z.string()), z.undefined()]),
      })
    )
    .query(({ ctx, input }) => {
      const { id } = input;
      if (!id || typeof id !== "string") {
        return null;
      }
      return ctx.prisma.quiz.findFirst({
        include: { questions: { include: { answers: true } } },
        where: { id: id },
      });
    }),
  update: publicProcedure
    .input(z.object({ quiz: quizInput, quizId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // const { title, questions } = input.quiz
      const {
        quiz: { questions, title },
        quizId,
      } = input;

      await ctx.prisma.question.deleteMany({
        where: {
          quizId,
        },
      });

      return ctx.prisma.quiz.update({
        where: {
          id: quizId,
        },
        data: {
          title,
          questions: {
            create: questions.map((question, questionIdx) => {
              const { description, correctAnswer } = question;
              return {
                description,
                correctAnswer,
                order: questionIdx,
                answers: {
                  create: question.answers.map((answer, idx) => {
                    const { text } = answer;
                    return {
                      text,
                      order: idx,
                    };
                  }),
                },
              };
            }),
          },
        },
      });
    }),

  addNew: publicProcedure.input(quizInput).mutation(async ({ ctx, input }) => {
    const { title, questions } = input;

    return ctx.prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((question, questionIdx) => {
            const { description, correctAnswer } = question;
            return {
              description,
              correctAnswer,
              order: questionIdx,
              answers: {
                create: question.answers.map((answer, idx) => {
                  const { text } = answer;
                  return {
                    text,
                    order: idx,
                  };
                }),
              },
            };
          }),
        },
      },
    });
  }),
  getAnswersByQuizId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const quiz = await ctx.prisma.quiz.findFirst({ where: { id: input } });
      const applicants = await ctx.prisma.applicant.findMany({
        include: {
          replies: true,
          quiz: {
            include: {
              questions: true,
            },
          },
        },
        where: {
          quizId: input,
        },
      });

      console.log("🚀 ~ .query ~ quiz:", quiz);
      console.log("🚀 ~ .query ~ applicants:", applicants);
      console.log("questions", applicants[0]?.quiz?.questions);
      const applicantsAnswers = applicants.map((applicant) => {
        let correctAnswers = 0;
        const questions = applicant.quiz.questions;
        questions.forEach((question, idx) => {
          if (applicant.replies[idx]?.answerNumber === question.correctAnswer) {
            correctAnswers += 1;
          }
        });

        console.log("question lengt", questions.length);
        console.log("🚀 ~ applicantsAnswers ~ correctAnswers:", correctAnswers);
        return {
          ...applicant,
          correctPercent: Math.floor((correctAnswers / questions.length) * 100),
        };
      });
      console.log(
        "🚀 ~ applicantsAnswers ~ applicantsAnswers:",
        applicantsAnswers
      );
      return sortBy(applicantsAnswers, ["correctPercent"]);
    }),
});
