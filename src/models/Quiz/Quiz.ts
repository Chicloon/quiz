import { destroy, types as t } from "mobx-state-tree";
import { Question } from "./Question";

export type ErrorFields = "title" | "question";

export const Quiz = t
  .model("Quiz", {
    title: "Quiz title is here",
    questions: t.array(Question),
    errors: t.map(t.string),
  })
  .actions((self) => ({
    setTitle(title: string) {
      self.title = title;
    },
    addQuestion(title: string) {
      self.questions.push({ title: title });
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
      // self.errors.set("title", "asdfasdfa");
    },
  }));
