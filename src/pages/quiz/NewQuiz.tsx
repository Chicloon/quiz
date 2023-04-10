import React, { useState } from "react";
import { z } from "zod";
import { observer } from "mobx-react-lite";
import { useMst } from "~/models";
import { api } from "~/utils/api";

const NewQuiz = () => {
  const {
    quiz: { setTitle, title, errors, setErrors, clearErrors },
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
    <div className="min-w-full">
      <label className="label">
        <span className="label-text">Название опросника</span>
      </label>
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

      <button className="btn-sm btn">Добавить вопрос</button>
    </div>
  );
};

export default observer(NewQuiz);
