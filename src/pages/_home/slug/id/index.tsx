import { useRouter } from "next/router";
import React from "react";

const Questions = () => {
  const router = useRouter();
  console.log("🚀 ~ Questions ~ router:", router);

  return <div>Questions</div>;
};

export default Questions;
