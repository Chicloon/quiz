import { types as t, Instance, destroy } from "mobx-state-tree";

export const Question = t
  .model("Question", {
    description: "",
    answers: t.array(t.string),
    correctAnswer: 0,
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
      self.answers.push("");
    },
    deleteAnswer(idx: number) {
      self.answers.splice(idx, 1);
    },
    changeAnswer({ idx, description }: { idx: number; description: string }) {
      self.answers[idx] = description;
    },
  }));

export type QuestionInstance = Instance<typeof Question>;
