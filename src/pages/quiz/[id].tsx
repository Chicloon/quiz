import { useRouter } from "next/router";
import React from "react";
import { useMst } from "~/models/Root";
import { EditQuiz } from "~/components/";
import { api } from "~/utils/api";
import { Quiz } from "~/models";

const SideId = () => {
  const router = useRouter();
  const { id } = router.query;

  const res = fetch(
    "http://localhost:3000/api/trpc/bot.getById?" +
      new URLSearchParams({
        batch: "1",
        input: JSON.stringify({ 0: { json: "clgcdidyz001svqe2u78c3k8z" } }),
      })
  );

  const { data, isLoading } = api.quiz.getById.useQuery(
    { id },
    {
      onSuccess(resp) {
        if (!resp) {
          console.error("Данные не найдены");
          return;
        }
      },
    }
  );

  return <EditQuiz model={Quiz.create(data || undefined)} />;
  // return <div></div>;
};

export default SideId;
