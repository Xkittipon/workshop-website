import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown, ShoppingCart } from "lucide-react";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#000000] text-white">
      <div className="mx-auto  px-4 ">
        <div className="flex justify-between  h-16 items-center">
          <div className="flex gap-6 items-center">
            <Link to={"/"} className="text-2xl font-bold">
              Logo
            </Link>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-[4px] decoration-yellow-500 decoration-4 px-3 py-2 rounded-sm text-sm font-medium"
                  : "px-3 py-2 rounded-sm text-sm font-medium  "
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-[4px] decoration-yellow-500 decoration-4 px-3 py-2 rounded-sm text-sm font-medium"
                  : "px-3 py-2 rounded-sm text-sm font-medium  "
              }
              to={"/shop"}
            >
              Shop
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-[4px] decoration-[#fca311] decoration-4 px-3 py-2 rounded-sm text-sm font-medium"
                    : "px-3 py-2 rounded-sm text-sm font-medium  "
                }
                to={"/cart"}
              >
                <span className="relative">
                  <ShoppingCart size={24} />
                  {carts.length > 0 && (
                    <span className="absolute top-0 left-4 bottom-2 bg-[#fca311] rounded-full px-2 text-xs">
                      {carts.length}
                    </span>
                  )}
                </span>
              </NavLink>
              <button
                className="flex items-center gap-1 p-2 hover:bg-gray-700 rounded-md"
                onClick={toggleDropdown}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://cdn-icons-png.flaticon.com/512/4086/4086679.png"
                  alt=""
                />
                <ChevronDown className="w-5 h-5" />
              </button>
              {isOpen && (
                <div className="absolute top-16 text-black mt-2  bg-white shadow-md z-50">
                  <Link className="block px-2 py-2 hover:bg-gray-200">
                    History
                  </Link>
                  <button
                    onClick={logout}
                    className="block px-2 py-2 hover:bg-gray-200"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-[5px] decoration-yellow-500 decoration-4 px-3 py-2 rounded-sm text-sm font-medium"
                    : "px-3 py-2 rounded-sm text-sm font-medium  "
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
