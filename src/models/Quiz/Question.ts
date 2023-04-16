import { types as t, Instance, destroy } from "mobx-state-tree";
import { maybe, maybeNull } from "mobx-state-tree/dist/internal";
import { Answer } from "./Answer";

export const Question = t
  .model("Question", {
    id: "",
    description: "",
    answers: t.array(Answer),
    correctAnswer: 0,
    order: 0,
  })
  .actions((self) => ({
    setDescription(description: string) {
      self.description = description;
    },
    setCorrectAnswer(idx: number) {
      self.correctAnswer = idx;
    },
  }))
  .actions((self) => ({
    addAnswer() {
      self.answers.push({});
    },
    deleteAnswer(idx: number) {
      self.answers.splice(idx, 1);
    },
    changeAnswer({ idx, text }: { idx: number; text: string }) {
      self.answers[idx]?.setText(text);
    },
  }));

export type QuestionInstance = Instance<typeof Question>;
