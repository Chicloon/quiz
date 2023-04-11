import React from "react";
import { api } from "~/utils/api";
import { Loader } from "~/components";
import Link from "next/link";

const QuizList = () => {
  const { data, isLoading } = api.quiz.getAll.useQuery();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ol>
        {data?.map((el: any) => (
          <Link key={el.id} href={`/quiz/${el.id}`}>
            <li>{el.title}</li>
          </Link>
        ))}
      </ol>
    </div>
  );
};

export default QuizList;
