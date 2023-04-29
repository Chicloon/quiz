import { observer } from "mobx-react-lite";
import React from "react";
import { QuestionInstance, useMst } from "~/models";

const Question: React.FC<{ model: QuestionInstance; id: number }> = ({
  model,
  id,
}) => {
  const {
    addAnswer,
    description,
    setDescription,
    answers,
    changeAnswer,
    deleteAnswer,
    correctAnswer,
    setCorrectAnswer,
    score,
    setScore,
  } = model;

  return (
    <div className="py-2">
      <h1 className="font-semibold italic">Вопрос №{id + 1}</h1>
      <div className="flex gap-2">
        <div className="grow">
          <label className="label">
            <span className="label-text">Текс вопроса</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="grow-1 textarea-bordered textarea textarea-sm w-full rounded-lg"
          ></textarea>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Вес ответа</span>
          </label>
          <input
            className="input-bordered input"
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>
      </div>
      <div className="py-1 pl-8">
        <h1 className="italic">Ответы</h1>
        {answers.map((answer, idx) => (
          <div
            key={`question ${id} answer - ${idx}`}
            className="flex items-center gap-2 py-2 pl-2"
          >
            <span className="w-5">{idx + 1}</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={correctAnswer === idx}
              onChange={() => setCorrectAnswer(idx)}
            />
            <textarea
              className="textarea-bordered textarea textarea-xs w-full grow rounded-lg"
              value={answer.text}
              onChange={(e) => changeAnswer({ idx, text: e.target.value })}
            ></textarea>
            <button className="btn-error btn" onClick={() => deleteAnswer(idx)}>
              X
            </button>
          </div>
        ))}

        {answers.length < 4 && (
          <button
            className="btn-secondary btn-xs btn rounded-md"
            onClick={addAnswer}
          >
            Добавить ответ
          </button>
        )}
      </div>
    </div>
  );
};

export default observer(Question);
