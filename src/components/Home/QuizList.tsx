import React, { useState } from "react";
import { api } from "~/utils/api";
import { Loader } from "~/components";
import { useRouter } from "next/router";

import { answersStore } from "~/models";
import { observer } from "mobx-react-lite";

const QuizList = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const { data, isLoading, refetch } = api.quiz.getAll.useQuery();
  const { mutate } = api.quiz.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  // console.log("🚀 ~ QuizList ~ answers:", answers);

  if (isLoading) {
    return <Loader />;
  }
  if (data?.length === 0) {
    return <div> Нет результатов </div>;
  }
  return (
    <div>
      <ol>
        {data?.map((el: any) => (
          <li key={el.id} className="mb-1 ">
            <div
              className={`bg flex cursor-pointer gap-2 rounded p-2 ${
                answersStore.id === el.id ? "bg-slate-300" : ""
              }  `}
              onClick={() => answersStore.setId(el.id)}
            >
              <span className="grow">{el.title}</span>

              <button
                className="btn-xs btn"
                onClick={() => router.push(`/quiz/${el.id}`)}
              >
                Edit
              </button>
              <button
                className="btn-error btn-xs btn"
                onClick={() => mutate(el.id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default observer(QuizList);
