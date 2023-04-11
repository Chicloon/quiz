import { destroy, types as t } from "mobx-state-tree";
import { Question } from "./Question";
import { quizInput } from "~/server/api/routers/quiz";
import { z } from "zod";

export type ErrorFields = "title" | "question";

export const Quiz = t
  .model("Quiz", {
    title: "Quiz title is here",
    questions: t.array(Question),
    errors: t.map(t.string),
  })
  .views((self) => ({
    quizBody() {
      const body: z.infer<typeof quizInput> = {
        title: self.title,
        questions: self.questions.map((question, idx) => {
          const { description, correctAnswer, answers } = question;
          return {
            order: idx,
            description,
            correctAnswer,
            answers: answers.map((el, answerIdx) => ({
              text: el,
              order: answerIdx,
            })),
          };
        }),
      };
      return body;
    },
    get allowAddNextQuestion() {
      const lastQuestion = self.questions[self.questions.length - 1];
      const lastQuestionAnswers = lastQuestion?.answers;

      if (
        lastQuestionAnswers &&
        lastQuestionAnswers.length > 0 &&
        lastQuestion.description !== "" &&
        lastQuestionAnswers.every((el) => el !== "")
      ) {
        return true;
      }
      return false;
    },
  }))
  .actions((self) => ({
    setTitle(title: string) {
      self.title = title;
    },
    addQuestion() {
      self.questions.push({});
      // self.questions.push({ title: title });
    },
    setErrors({ field, text }: { field: ErrorFields; text: string }) {
      self.errors.set(field, text);
    },
    clearErrors() {
      destroy(self.errors);
    },
  }))
  .actions((self) => ({
    afterCreate() {
      self.questions.push({ description: "Question titile" });
      // self.errors.set("title", "asdfasdfa");
    },
  }));
