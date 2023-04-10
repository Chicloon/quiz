import React from "react";
import { useMst } from "../../models/Root";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "~/utils/api";
import { QuizList } from "./QuizList";
import NewQuizInput from "./NewQuizInput";

const Questions = () => {
  const root = useMst();
  const router = useRouter();
  console.log("root", root);
  const ctx = api.useContext();
  const { data: allQuizzes, isLoading: loadingQuizzes } =
    api.quiz.getAll.useQuery();

  const { mutate, isLoading } = api.quiz.addNew.useMutation({
    onSuccess() {
      void ctx.quiz.invalidate();
    },
  });

  console.log("all quiezes", allQuizzes);

  return (
    <div>
      <div>
        <button
          className="btn-primary btn"
          onClick={() => mutate({ title: "1" })}
        >
          +
        </button>
        <NewQuizInput />
        <QuizList />
        <Link href="/questions/1"> info</Link>
      </div>
      <div> Quiz answers</div>
    </div>
  );
};

export default observer(Questions);
