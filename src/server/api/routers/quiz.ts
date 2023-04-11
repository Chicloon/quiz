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
      order: z.number(),
      description: z.string(),
      correctAnswer: z.number(),
      answers: z.array(
        z.object({
          text: z.string(),
          order: z.number(),
        })
      ),
    })
  ),
});

export const quizRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.quiz.findMany({ include: { questions: true } });
  }),
  addNew: publicProcedure.input(quizInput).mutation(async ({ ctx, input }) => {
    console.log(
      "🚀 ~ file: quiz.ts:31 ~ addNew:publicProcedure.input ~ input:",
      input
    );
    const { title, questions } = input;

    const newQuiz = await ctx.prisma.quiz.create({ data: { title } });
    const newQuestions = await ctx.prisma.question.createMany({
      data: questions.map((el) => {
        const { order, description, correctAnswer } = el;
        return {
          quizId: newQuiz.id,
          order,
          description,
          correctAnswer,
        };
      }),
    });
    console.log(
      "🚀 ~ file: quiz.ts:49 ~ addNew:publicProcedure.input ~ newQuestions:",
      newQuestions
    );
    return newQuestions;

    const answersData = [];
    // questions.forEach((question, idx)=> {
    //   question.answers.forEach(answer=> {
    //     answersData.push(
    //       {
    //         questionId: newQuestions[idx]
    //       }
    //     )
    //   })
    // })
    // const newAnswers = await ctx.prisma.answer.createMany({
    // });
    // ctx.prisma
    // return ctx.prisma.quiz.createMany({
    //   data: input,
    // });
  }),
});
