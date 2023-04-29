import { Instance, applySnapshot, destroy, types as t } from "mobx-state-tree";
import { Question } from "./Question";
import { quizInput } from "~/server/api/routers/quiz";
import { z } from "zod";

export type ErrorFields = "title" | "question";

export const Quiz = t
  .model("Quiz", {
    id: "",
    title: "Quiz title is here",
    questions: t.array(Question),
    errors: t.map(t.string),
  })
  .views((self) => ({
    quizBody() {
      const body: z.infer<typeof quizInput> = {
        title: self.title,
        questions: self.questions.map((question, idx) => {
          const { answers } = question;
          return {
            ...question,
            order: idx,
            answers: answers.map((el, answerIdx) => ({
              id: el.id,
              text: el.text,
              order: answerIdx,
              isCorrect: el.isCorrect,
            })),
          };
        }),
      };
      return body;
    },
    get allowSave() {
      const lastQuestion = self.questions[self.questions.length - 1];
      const allow =
        lastQuestion?.description.trim() !== "" &&
        lastQuestion?.answers?.length &&
        lastQuestion.answers.length > 1 &&
        lastQuestion.answers.every((el) => el.text.trim() !== "");

      return !!allow;
    },
    get allowAddNextQuestion() {
      const lastQuestion = self.questions[self.questions.length - 1];
      const lastQuestionAnswers = lastQuestion?.answers;

      if (self.questions.length === 0) {
        return true;
      }

      if (
        lastQuestionAnswers &&
        lastQuestionAnswers.length > 0 &&
        lastQuestion.description !== "" &&
        lastQuestionAnswers.every((el) => el.text !== "")
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
    deleteQuestion(idx: number) {
      destroy(self.questions[idx]);
    },
  }))

  .actions((self) => ({
    afterCreate() {
      // self.questions.push({ description: "Question titile" });
    },
  }));

export type QuizInstance = Instance<typeof Quiz>;
