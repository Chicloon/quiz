import React from "react";
import Profile from "./Profile";

export const Navbar = () => {
  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">daisyUI</a>
      </div>
      <div className="flex-none">
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
