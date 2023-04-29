import { types as t, Instance, destroy } from "mobx-state-tree";
import { maybe, maybeNull } from "mobx-state-tree/dist/internal";
import { Answer } from "./Answer";

export const Question = t
  .model("Question", {
    id: "",
    description: "",
    answers: t.array(Answer),
    order: 0,
    score: 1,
  })
  .views((self) => ({
    get correctAnswer() {
      let index = 0;
      self.answers.forEach((el, idx) => {
        if (el.isCorrect) {
          index = idx;
          return;
        }
      });
      console.log("res", index);
      return index;
    },
  }))
  .actions((self) => ({
    setScore(score: string) {
      self.score = parseInt(score);
    },
    setDescription(description: string) {
      self.description = description;
    },
    setCorrectAnswer(index: number) {
      self.answers.forEach((answer, idx) => {
        if (index === idx) {
          answer.setCorrect(true);
        } else {
          answer.setCorrect(false);
        }
      });
    },
  }))
  .actions((self) => ({
    addAnswer() {
      self.answers.push({});
      if (self.answers.length === 1) {
        self.answers[0]?.setCorrect(true);
      }
    },
    deleteAnswer(idx: number) {
      self.answers.splice(idx, 1);
    },
    changeAnswer({ idx, text }: { idx: number; text: string }) {
      self.answers[idx]?.setText(text);
    },
  }));

export type QuestionInstance = Instance<typeof Question>;
