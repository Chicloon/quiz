import React from "react";
import { api } from "~/utils/api";
import { Loader } from "../components";

export const QuizList = () => {
  const { data, isLoading } = api.quiz.getAll.useQuery();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ol>
        {data?.map((el) => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ol>
    </div>
  );
};
