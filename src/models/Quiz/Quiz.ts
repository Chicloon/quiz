import { destroy, types as t } from "mobx-state-tree";
import { Question } from "./Question";

export type ErrorFields = "title" | "question";

export const Quiz = t
  .model("Quiz", {
    title: "Quiz title is here",
    questions: t.array(Question),
    errors: t.map(t.string),
  })
  .views((self) => ({
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
