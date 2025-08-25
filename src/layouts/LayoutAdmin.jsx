import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/sidebarAdmin";
import HeaderAdmin from "../components/admin/headerAdmin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex flex-1 flex-col">
        {/* <HeaderAdmin />*/}

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
