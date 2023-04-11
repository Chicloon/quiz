import React from "react";
import { LeftSide, RightSide } from "~/components";

const Home = () => {
  return (
    <>
      <div className="bg-slate-2 artboard h-full border-2 border-solid border-slate-400 p-2 ">
        <LeftSide />
      </div>
      <div className="bg-slate-2 artboard h-full border-2 border-solid border-slate-400 p-2 ">
        <RightSide />
      </div>
    </>
  );
};

export default Home;
