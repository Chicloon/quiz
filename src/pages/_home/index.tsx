import React from "react";
import Answers from "./Answers";
import QuestionsList from "./QuestionsLists";
import { api } from "~/utils/api";
import { useMst } from "~/models";

const Home = () => {
  const root = useMst();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <div className="bg-slate-2 artboard h-full border-2 border-solid border-slate-400 p-2 ">
        <QuestionsList />
      </div>
      <div className="bg-slate-2 artboard h-full border-2 border-solid border-slate-400 p-2 ">
        <Answers />
      </div>
    </>
    // </div>
  );
};

export default Home;
