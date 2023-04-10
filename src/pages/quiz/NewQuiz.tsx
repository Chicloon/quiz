import React, { useState } from "react";
import { z } from "zod";
import { observer } from "mobx-react-lite";
import { useMst } from "~/models";
import { api } from "~/utils/api";
import Question from "./Question";

const NewQuiz = () => {
  const {
    quiz: {
      setTitle,
      title,
      errors,
      setErrors,
      clearErrors,
      questions,
      addQuestion,
      allowAddNextQuestion,
    },
  } = useMst();

  const ctx = api.useContext();

  const { mutate, isLoading } = api.quiz.addNew.useMutation({
    onSuccess() {
      void ctx.quiz.invalidate();
    },
  });
  // const [value, setValue] = useState("");
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // addTitle(value);
    setTitle(value);
    try {
      if (z.string().min(1).max(50).parse(value)) {
        console.log("all ok");
        clearErrors();
      }
    } catch (error: unknown) {
      setErrors({ field: "title", text: "Неверный формат заголовка" });
    }
  };

  return (
    <div className="min-w-full p-4">
      <h1 className="text-lg font-semibold">Название опросника</h1>

      <input
        className="input-bordered input input-sm min-w-full"
        type="text"
        onChange={onTitleChange}
        value={title}
      />
      <label className="label">
        <span className="label-text-alt text-red-500">
          {errors.get("title")}
        </span>
      </label>
      {questions.map((question, idx) => (
        <Question key={`qustion-${idx}`} model={question} id={idx} />
      ))}
      <div className="flex justify-end">
        <button
          className="btn-sm btn ml-auto"
          onClick={addQuestion}
          disabled={!allowAddNextQuestion}
        >
          Добавить вопрос
        </button>
      </div>
    </div>
  );
};

export default observer(NewQuiz);
