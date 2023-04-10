import { Instance, onSnapshot, types, flow } from "mobx-state-tree";
import { createContext, useContext } from "react";
// import { api } from "~/utils/api";
import { Quiz } from "./Quiz";
import { appRouter } from "~/server/api/root";

export const RootModel = types.model("Root", {
  quiz: Quiz,
});

export const initialState = {
  quiz: {},
};

export const rootStore = RootModel.create(initialState);

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
