import React, { useState } from "react";
import { z } from "zod";
import { observer } from "mobx-react-lite";
import { QuizInstance, useMst } from "~/models";
import { api } from "~/utils/api";
import Question from "./Question";

const EditQuiz: React.FC<{ model: QuizInstance }> = ({ model }) => {
  const {
    id,
    setTitle,
    title,
    errors,
    setErrors,
    clearErrors,
    questions,
    addQuestion,
    allowAddNextQuestion,
    quizBody,
    deleteQuestion,
  } = model;

  const ctx = api.useContext();

  const { mutate: createNew } = api.quiz.addNew.useMutation({
    onSuccess() {
      void ctx.quiz.invalidate();
    },
  });
  const { mutate: update } = api.quiz.update.useMutation({
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
    <div className="min-w-full overflow-auto p-4">
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
        <div className="flex gap-2">
          <button
            className="btn-error btn mt-4"
            onClick={() => deleteQuestion(idx)}
          >
            X
          </button>
          <div className="grow">
            <Question key={`question-${idx}`} model={question} id={idx} />
          </div>
        </div>
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
      <div>
        {id ? (
          <button
            className="btn"
            onClick={() => update({ quiz: quizBody(), quizId: id })}
          >
            Сохранить изменения
          </button>
        ) : (
          <button className="btn" onClick={() => createNew(quizBody())}>
            Создать опросник
          </button>
        )}
      </div>
    </div>
  );
};

export default observer(EditQuiz);
