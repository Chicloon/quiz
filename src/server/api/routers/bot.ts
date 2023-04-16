import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const botRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.quiz.findUnique({
      select: {
        title: true,
        questions: {
          select: {
            description: true,
            answers: {
              select: {
                text: true,
                id: true,
              },
            },
          },
        },
      },
      where: { id: input },
    });
  }),
  createApplicant: publicProcedure
    .input(
      z.object({
        name: z.string(),
        quizId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log("--- input", input);
      return ctx.prisma.applicant.create({ data: input });
    }),
  sendAnswer: publicProcedure
    .input(
      z.object({
        applicantId: z.string(),
        answerId: z.string(),
        answerNumber: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.reply.create({ data: input });
    }),
  // update: publicProcedure
  //   .input(z.object({ quiz: quizInput, quizId: z.string() }))
  //   .mutation(async ({ ctx, input }) => {
  //     // const { title, questions } = input.quiz
  //     const {
  //       quiz: { questions, title },
  //       quizId,
  //     } = input;

  //     return ctx.prisma.quiz.update({
  //       where: {
  //         id: quizId,
  //       },
  //       data: {
  //         title,
  //         questions: {
  //           update: questions.map((question, questionIdx) => {
  //             const { description, correctAnswer, id: questionId } = question;

  //             const res = {
  //               description,
  //               correctAnswer,
  //               order: questionIdx,
  //               answers: {
  //                 update: question.answers.map((answer, idx) => {
  //                   const { text, id: answerId } = answer;

  //                   const res = {
  //                     text,
  //                     order: idx,
  //                   };
  //                   return {
  //                     data: res,
  //                     where: { id: answerId },
  //                   };
  //                 }),
  //               },
  //             };

  //             return {
  //               data: res,
  //               where: {
  //                 id: questionId,
  //               },
  //             };
  //           }),
  //         },
  //       },
  //     });
  //   }),
  // addNew: publicProcedure.input(quizInput).mutation(async ({ ctx, input }) => {
  //   const { title, questions } = input;

  //   return ctx.prisma.quiz.create({
  //     data: {
  //       title,
  //       questions: {
  //         create: questions.map((question, questionIdx) => {
  //           const { description, correctAnswer } = question;
  //           return {
  //             description,
  //             correctAnswer,
  //             order: questionIdx,
  //             answers: {
  //               create: question.answers.map((answer, idx) => {
  //                 const { text } = answer;
  //                 return {
  //                   text,
  //                   order: idx,
  //                 };
  //               }),
  //             },
  //           };
  //         }),
  //       },
  //     },
  //   });
  // }),
});
