import React, { useState } from "react";
import { api } from "~/utils/api";
import { Loader } from "~/components";
import Link from "next/link";

import { answersStore } from "~/models";
import { observer } from "mobx-react-lite";

const QuizList = () => {
  // const [id, setId] = useState<null | string>(null);
  const [id, setId] = useState("");
  const { data, isLoading } = api.quiz.getAll.useQuery();
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
          <li key={el.id}>
            <div
              className={`bg flex ${
                answersStore.id === el.id ? "bg-lime-100" : ""
              }  `}
            >
              <span className="grow">{el.title}</span>

              <Link href={`/quiz/${el.id}`}>
                <button className="btn-xs btn">Edit</button>
              </Link>
              {/* <button className="btn-xs btn" onClick={() => setId(el.id)}> */}
              <button
                className="btn-xs btn"
                onClick={() => answersStore.setId(el.id)}
              >
                Результаты
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default observer(QuizList);
