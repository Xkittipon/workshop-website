import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserRoundPen,
  ChartBarStacked,
  PackageCheck,
  Logs,
  LogOut,
} from "lucide-react";
import useEcomStore from "../../store/ecom-store";

const SidebarAdmin = () => {
  const logout = useEcomStore((state) => state.logout);

  return (
    <div className="bg-[#14213d] h-screen w-64 p-4 flex flex-col text-white">
      <div
        className="h-24  flex items-center justify-center text-3xl
      font-bold mb-4"
      >
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#fca311] text-white text-lg px-4 py-2 rounded flex items-center"
              : "text-gray-300 hover:bg-slate-700 px-2 py-1 rounded flex items-center hover:text-white"
          }
        >
          <UserRoundPen className="mr-2" />
          Manage
        </NavLink>
        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#fca311] text-white text-lg px-4 py-2 rounded flex items-center"
              : "text-gray-300 hover:bg-slate-700 px-2 py-1 rounded flex items-center hover:text-white"
          }
        >
          <ChartBarStacked className="mr-2" />
          Category
        </NavLink>
        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#fca311] text-white text-lg px-4 py-2 rounded flex items-center"
              : "text-gray-300 hover:bg-slate-700 px-2 py-1 rounded flex items-center hover:text-white"
          }
        >
          <PackageCheck className="mr-2" />
          Product
        </NavLink>
        <NavLink
          to={"orders"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-[#fca311] text-white text-lg px-4 py-2 rounded flex items-center"
              : "text-gray-300 hover:bg-slate-700 px-2 py-1 rounded flex items-center  hover:text-white "
          }
        >
          <Logs className="mr-2" />
          Manage Order
        </NavLink>
      </nav>

      <footer className="flex justify-center items-center mt-auto">
        <button
          className="bg-[#e5e5e5] text-[#000000] text-lg px-4 py-2 rounded flex items-center"
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          log out
          <LogOut className="ml-2" />
        </button>
      </footer>
    </div>
  );
};

export default SidebarAdmin;
