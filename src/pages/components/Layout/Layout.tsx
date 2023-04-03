import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="overflow-none  flex h-screen min-h-full flex-col items-center justify-center">
      <Navbar />
      <main>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {props.children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
