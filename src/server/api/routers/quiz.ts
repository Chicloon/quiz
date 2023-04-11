import { z } from "zod";

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

      return ctx.prisma.quiz.update({
        where: {
          id: quizId,
        },
        data: {
          title,
          questions: {
            update: questions.map((question, questionIdx) => {
              const { description, correctAnswer, id: questionId } = question;

              const res = {
                description,
                correctAnswer,
                order: questionIdx,
                answers: {
                  update: question.answers.map((answer, idx) => {
                    const { text, id: answerId } = answer;

                    const res = {
                      text,
                      order: idx,
                    };
                    return {
                      data: res,
                      where: { id: answerId },
                    };
                  }),
                },
              };

              return {
                data: res,
                where: {
                  id: questionId,
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
});
