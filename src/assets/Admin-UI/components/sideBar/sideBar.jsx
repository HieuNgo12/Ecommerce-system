import React from "react";
import { Link, useLocation } from "react-router-dom";
import dataSideBar from "../data/dataSideBar";
import burger from "../svg/hamburger-menu-svgrepo-com.svg";

function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-gray-800 text-white p-4 space-y-2 w-[100px] sm:w-auto">
      <h2 className="text-3xl font-bold hidden sm:block">ADMIN</h2>
      <img src={burger} alt="" className="block sm:hidden w-5 h-5" />
      <div className="border-b-2 border-white mb-2"></div>

      {dataSideBar.map((item) => (
        <Link
          key={item.id}
          to={`/${item.name.toLowerCase()}`}
          className={`flex sm:m-0 sm:justify-start sm:items-center cursor-pointer sm:py-2 sm:px-1 sm:gap-1 rounded transition-colors duration-200 ease-in-out box-border ${
            currentPath === `/${item.name.toLowerCase()}`
              ? "outline-none ring-2 ring-white rounded-md"
              : "hover:bg-gray-700"
          }`}
        >
          <img src={item.img} alt="" className="py-2" />
          <button className="w-full text-left hidden sm:block">
            {item.name}
          </button>
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;
