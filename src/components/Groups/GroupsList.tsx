import React from "react";
import { api, RouterOutputs } from "~/utils/api";
import Loader from "../Loader";
import { Group } from "@prisma/client";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { TRPCClientErrorLike } from "@trpc/react-query";
import { AppRouter } from "~/server/api/root";
import SubGroup from "./SubGroup";

type GroupListProps = UseTRPCQueryResult<
  RouterOutputs["group"]["getAll"],
  TRPCClientErrorLike<AppRouter>
>;

const GroupsList: React.FC<{ query: GroupListProps }> = ({ query }) => {
  const { data, isLoading, refetch } = query;
  const { mutate: createSubgroup } = api.group.addSubgroup.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) {
    return <Loader />;
  }

  console.log("gr", data);

  const addSubGroup = (group: Group) => {
    createSubgroup({ name: "asdfads", parentId: group.id });
    console.log("add subgroup", group);
    refetch();
  };

  return (
    <ol>
      {data?.map((el, idx) => (
        <div key={`${el.id}-gr`}>
          <div>
            Gr# {idx + 1}: {el.name}
          </div>
          <button className="btn-xs btn" onClick={() => addSubGroup(el)}>
            + subgroup
          </button>
          <div>
            Subgroups: <SubGroup group={el} />
          </div>
          <div> ------ </div>
        </div>
      ))}
    </ol>
  );
};

export default GroupsList;
