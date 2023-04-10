import { types as t } from "mobx-state-tree";

export const Question = t
  .model("Question", {
    title: "",
    answers: t.array(t.string),
    correctAnswer: 0,
  })
  .actions((self) => ({
    addAnswer(description: string) {
      self.answers.push(description);
    },
    changeAnswer({ idx, description }: { idx: number; description: string }) {
      self.answers[idx] = description;
    },
    setCorrectAnswer(idx: number) {
      self.correctAnswer = idx;
    },
  }));
