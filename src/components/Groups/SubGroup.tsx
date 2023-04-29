import { Group } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import Loader from "../Loader";

const SubGroup = ({ group, level = 1 }: { group: Group; level?: number }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [showSubgroup, setShowSubgroup] = useState(false);
  const { data, isLoading, refetch } = api.group.getSubgroups.useQuery(
    group.id
  );
  const { mutate: createSubgroup } = api.group.addSubgroup.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const addSubGroup = async (id: string) => {
    await createSubgroup({ name: "asdfads", parentId: id });
    // console.log("add subgroup", group);
    refetch();
    setShowChildren(true);
  };

  const renderSubgroup = (
    el: Group & {
      children: Group[];
    }
  ) => {
    console.log("subgr", el);
    if (el.children.length > 0) {
      console.log("--- sub sub gr", el.children);
      return el.children.map((subgroup) => (
        <SubGroup key={subgroup.id} group={subgroup} level={level + 1} />
      ));
    }
    console.log("elll id", el.id);

    return (
      <div>
        <SubGroup group={el} level={level} />
      </div>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="ml-4">
      <div className="flex gap-2">
        <h1>
          Gr Name :<u>{group.name}</u>
        </h1>
        {data?.length && data.length > 0 ? (
          <button
            className="btn-xs btn-circle btn"
            onClick={() => setShowChildren((prev) => !prev)}
          >
            {showChildren ? "-" : "+"}
          </button>
        ) : null}
      </div>
      <div>
        <button className="btn-xs btn" onClick={() => addSubGroup(group.id)}>
          + subSubgroup
        </button>
      </div>
      {showChildren &&
        data?.map((el, idx) => (
          <div key={el.id} className={`my-2 ml-4 border border-black p-1`}>
            <div className="flex gap-2">
              <div>
                SubGr of {group.name} #{idx}: {el.name}
              </div>
              <button
                className="btn-secondary btn-xs btn-circle btn"
                onClick={() => setShowSubgroup((prev) => !prev)}
              >
                {showSubgroup ? "-" : "+"}
              </button>
            </div>
            <div>
              <button className="btn-xs btn" onClick={() => addSubGroup(el.id)}>
                + subSubgroup
              </button>
            </div>

            {el.children.length > 0 &&
              showSubgroup &&
              el.children.map((subgroup) => (
                <div key={subgroup.id}>{renderSubgroup(subgroup)}</div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default SubGroup;
