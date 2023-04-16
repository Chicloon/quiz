import React from "react";
import { api } from "~/utils/api";
import { answersStore } from "~/models";
import Loader from "../Loader";
import { observer } from "mobx-react-lite";

const RightSide = () => {
  const { id } = answersStore;

  const { data, isLoading } = api.quiz.getAnswersByQuizId.useQuery(id, {
    enabled: id !== "",
  });
  console.log("🚀 ~ RightSide ~ data:", data);

  if (!data) {
    return <div>Выберите опрос</div>;
  }

  return (
    <div>
      <ul>
        {data?.map((el) => {
          const color =
            el.correctPercent > 90
              ? "green"
              : el.correctPercent > 50
              ? "blue"
              : "red";
          return (
            <li key={el.id}>
              <div className="flex">
                <span className="grow">{el.name}</span>
                <span style={{ color }} className="">
                  {el.correctPercent} %
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default observer(RightSide);
