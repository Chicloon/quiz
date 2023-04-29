import React from "react";
import Profile from "./Profile";
import { useRouter } from "next/router";
import { router } from "@trpc/server";

// const paths = [
//   {
//     name: "home",
//     link: "/",
//   },
//   { link: "/groups", name: "groups" },
// ];

const paths = ["/", "/groups"];

export const Navbar = () => {
  const router = useRouter();
  console.log("🚀 ~ Navbar ~ router:", router);

  console.log("path", router.pathname === paths[0]);
  const checkSelected = (path: (typeof paths)[number]) => {
    if (path === router.pathname) {
      return "outline";
    }
    return "";
  };

  return (
    <div className="navbar bg-neutral">
      <div className="flex-1 gap-2">
        <button
          className={`btn text-xl normal-case ${checkSelected(paths[0]!)}`}
          onClick={() => router.push(paths[0]!)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>
        <div
          className={`hover: btn text-xl normal-case ${checkSelected(
            paths[1]!
          )}`}
          onClick={() => router.push(paths[1]!)}
        >
          Группы
        </div>
      </div>
      <div className="flex-none">
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
