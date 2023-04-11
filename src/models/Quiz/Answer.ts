import { types as t, Instance, destroy } from "mobx-state-tree";
import { maybe, maybeNull } from "mobx-state-tree/dist/internal";

export const Answer = t
  .model("Question", {
    id: "",
    text: "",
    order: 0,
  })
  .actions((self) => ({
    setText(text: string) {
      self.text = text;
    },
  }));

export type AnswerInstance = Instance<typeof Answer>;
