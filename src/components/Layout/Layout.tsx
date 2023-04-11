import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="my-1 flex h-0  min-h-full grow gap-1 p-1">
        {props.children}
      </div>
    </main>
  );
};

export default Layout;
