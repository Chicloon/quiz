import React, { useState } from "react";
import { useMst } from "../../models/Root";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "~/utils/api";
import QuizList from "./QuizList";

const LeftSide = () => {
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
    <div className="flex min-h-full flex-col ">
      <div className="grow ">
        <QuizList />
      </div>
      <Link href={"/quiz/new"} className="btn-outline btn-block btn-sm btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mx-1 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Новый опросник
      </Link>
      {/* <Link href="/questions/1"> info</Link> */}
    </div>
  );
};

export default observer(LeftSide);
