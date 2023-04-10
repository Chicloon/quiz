import { useRouter } from "next/router";
import React from "react";

const Answers = () => {
  const router = useRouter();
  console.log("🚀 ~ Answers ~ router:", router);
  return <div>Answers</div>;
};

export default Answers;
