import React, { useState } from "react";
import { z } from "zod";
import { observer } from "mobx-react-lite";
import { useMst } from "~/models";

const NewQuizInput = () => {
  const {
    quiz: { setTitle: addTitle },
  } = useMst();
  // const [value, setValue] = useState("");
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    addTitle(value);

    try {
      if (z.string().min(1).max(10).parse(value)) {
        console.log("all ok");
      }
    } catch (error: unknown) {
      console.error("---- got error", error);
    }
  };

  return (
    <div>
      <label className="label">
        <span className="label-text">Название опросника</span>
      </label>
      <input className="input" type="text" onChange={onTitleChange} />
    </div>
  );
};

export default observer(NewQuizInput);
