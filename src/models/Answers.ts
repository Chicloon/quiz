import {
  Instance,
  applySnapshot,
  destroy,
  onSnapshot,
  types as t,
} from "mobx-state-tree";

export const Answers = t
  .model("Answers", {
    id: "",
  })
  .actions((self) => ({
    setId(id: string) {
      self.id = id;
    },
  }));

export const answersStore = Answers.create();

onSnapshot(answersStore, (snap) => {
  console.log("--- Answers", snap);
});
