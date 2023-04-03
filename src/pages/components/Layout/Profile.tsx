import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { api } from "~/utils/api";

const Profile = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const user = sessionData?.user;

  return (
    <div className="dropdown-end dropdown">
      <div className="avatar">
        {user ? (
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-9 rounded-full">
              <img src={user.image ?? ""} />
            </div>
          </label>
        ) : (
          <button className="btn-primary btn" onClick={() => void signIn()}>
            LogIn
          </button>
        )}
      </div>
      {user && (
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200  p-2 shadow"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a onClick={() => void signOut()}>Logout</a>
          </li>
        </ul>
      )}
    </div>
  );
  // return (
  //   <div className="flex flex-col items-center justify-center gap-4">
  //     <p className="text-center text-2xl text-white">
  //       {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
  //       {secretMessage && <span> - {secretMessage}</span>}
  //     </p>
  //     <button
  //       className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
  //       onClick={sessionData ? () => void signOut() : () => void signIn()}
  //     >
  //       {sessionData ? "Sign out" : "Sign in"}
  //     </button>
  //   </div>
  // );
};

export default Profile;
