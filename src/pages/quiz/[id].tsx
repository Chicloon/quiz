import { useRouter } from "next/router";
import React from "react";
import { useMst } from "~/models/Root";
import NewQuiz from "./NewQuiz";
import EditQuiz from "./EditQuiz";

const SideId = () => {
  const root = useMst();
  const router = useRouter();

  const { id } = router.query;
  console.log("🚀 ~ SideId ~ id:", id);
  // console.log("🚀 ~ SideId ~ router:", router);

  if (id === "new") {
    return <NewQuiz />;
  } else if (typeof id === "string") {
    return <EditQuiz id={id} />;
  }

  return <div>Что-то пошло не так</div>;
};

export default SideId;
