import { observer } from "mobx-react-lite";
import React from "react";
import { QuestionInstance, useMst } from "~/models";

// const Question: React.FC<{ save: () => void }> = ({ save }) => {
const Question: React.FC<{ model: QuestionInstance; id: number }> = ({
  model,
  id,
}) => {
  // const {
  //   quiz: { questions },
  // } = useMst();
  const {
    addAnswer,
    description,
    setDescription,
    answers,
    changeAnswer,
    deleteAnswer,
    correctAnswer,
    setCorrectAnswer,
  } = model;
  console.log("save");

  return (
    <div className="py-2">
      <h1 className="font-semibold italic">Вопрос №{id + 1}</h1>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea-bordered textarea textarea-sm w-full rounded-lg"
      ></textarea>

      <div className="py-1 pl-8">
        <h1 className="italic">Ответы</h1>
        {answers.map((answer, idx) => (
          <div
            key={`question ${id} answer - ${idx}`}
            className="flex items-center gap-2 py-2 pl-2"
          >
            <input
              type="checkbox"
              className="checkbox"
              checked={correctAnswer === idx}
              onClick={() => setCorrectAnswer(idx)}
            />
            <span className="w-5">{idx + 1}</span>
            <textarea
              className="textarea-bordered textarea textarea-xs w-full grow rounded-lg"
              value={answer}
              onChange={(e) =>
                changeAnswer({ idx, description: e.target.value })
              }
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
