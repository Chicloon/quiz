import React, { useState } from "react";
import { LeftSide, Loader, RightSide } from "~/components";
import { api } from "~/utils/api";

const Home = () => {
  const [groupName, setGroupName] = useState("");
  const { data, isLoading, refetch } = api.group.getAll.useQuery();
  const { mutate } = api.group.create.useMutation({
    onSuccess: () => {
      refetch();
      console.log("create new group", groupName);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex w-full flex-col">
      <div className="bg-slate-2 artboard h-full border-2 border-solid border-slate-400 p-2 ">
        <LeftSide />
      </div>
      <div className="bg-slate-2 artboard h-full border-2 border-solid border-slate-400 p-2 ">
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
