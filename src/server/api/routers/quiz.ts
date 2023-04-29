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
      score: z.number(),
      answers: z.array(
        z.object({
          id: z.string(),
          text: z.string(),
          order: z.number(),
          isCorrect: z.boolean(),
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
        createdAt: "desc",
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

  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.quiz.delete({ where: { id: input } });
  }),

  addNew: publicProcedure.input(quizInput).mutation(async ({ ctx, input }) => {
    const { title, questions } = input;
    return ctx.prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((question, questionIdx) => {
            return {
              ...question,
              order: questionIdx,
              answers: {
                create: question.answers.map((answer, idx) => {
                  const { text, isCorrect } = answer;
                  return {
                    isCorrect,
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

  update: publicProcedure
    .input(z.object({ quiz: quizInput, quizId: z.string() }))
    .mutation(async ({ ctx, input }) => {
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
              return {
                ...question,
                order: questionIdx,
                answers: {
                  create: question.answers.map((answer, idx) => {
                    const { text, isCorrect } = answer;
                    return {
                      isCorrect,
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
          replies: {
            include: { answer: true },
          },
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

      const applicantsAnswers = applicants.map((applicant) => {
        let correctAnswers = applicant.replies.filter(
          (el) => el.answer.isCorrect
        ).length;
        const questions = applicant.quiz.questions;

        return {
          ...applicant,
          correctPercent: Math.floor((correctAnswers / questions.length) * 100),
        };
      });

      console.log(
        "🚀 ~ applicantsAnswers ~ applicantsAnswers:",
        applicantsAnswers
      );
      return sortBy(applicantsAnswers, ["correctPercent"]).reverse();
    }),
});
