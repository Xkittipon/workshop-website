import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const LayoutUser = () => {
  return (
    <div>
      <MainNav />
      <main className="h-full mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutUser;
