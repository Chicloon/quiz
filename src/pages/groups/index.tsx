import { Group } from "@prisma/client";
import React, { useState } from "react";
import { Loader } from "~/components";
import { GroupsList } from "~/components/Groups";
import { api } from "~/utils/api";

const Groups = () => {
  const allGroups = api.group.getAll.useQuery();
  const { data, isLoading, refetch } = allGroups;

  const { mutate: createGroup } = api.group.create.useMutation({
    onSuccess: () => {
      refetch();
      console.log("success!!!");
    },
  });
  const [name, setName] = useState("");

  const onSubmit = () => {
    createGroup(name);
    setName("");
  };

  return (
    <div className="min-w-full">
      <GroupsList query={allGroups} />
      <form onSubmit={onSubmit}>
        <input
          className="input-bordered input input-sm min-w-full"
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          value={name}
        />
        <button className="btn-sm btn" type="submit">
          Add new
        </button>
      </form>
    </div>
  );
};

export default Groups;
