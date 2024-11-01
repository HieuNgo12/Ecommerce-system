import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import dataSideBar from "../data/dataSideBar";
import burger from "../svg/hamburger-menu-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Sidebar() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const adminPage = () => {
    navigate("/admin");
  };

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    const getToken = getCookieValue("token");
    if (!getToken) {
      navigate("/login");
    } else {
      setToken(getToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token));
    }
  }, [token]);

  return (
    <nav className="bg-gray-800 text-white p-4 space-y-2 w-[100px] sm:w-auto">
      <h2
        className="text-3xl font-bold hidden sm:block cursor-pointer"
        onClick={() => adminPage()}
      >
        ADMIN
      </h2>
      <img src={burger} alt="" className="block sm:hidden w-5 h-5" />
      <div className="border-b-2 border-white mb-2"></div>

      {user.role === "super"
        ? dataSideBar.map((item) => (
            <Link
              key={item.id}
              to={`/admin/${item.name.toLowerCase()}`}
              className={`flex sm:m-0 sm:justify-start sm:items-center cursor-pointer sm:py-2 sm:px-1 sm:gap-1 rounded transition-colors duration-200 ease-in-out box-border w-40 ${
                currentPath === `/admin/${item.name.toLowerCase()}`
                  ? "outline-none ring-2 ring-white rounded-md"
                  : "hover:bg-gray-700"
              }`}
            >
              <img src={item.img} alt="" className="py-2" />
              <button className="w-full text-left text-white hidden text-xl sm:block">
                {item.name}
              </button>
            </Link>
          ))
        : dataSideBar
            .filter((item) => !item.requiresSuper)
            .map((item) => (
              <Link
                key={item.id}
                to={`/admin/${item.name.toLowerCase()}`}
                className={`flex sm:m-0 sm:justify-start sm:items-center cursor-pointer sm:py-2 sm:px-1 sm:gap-1 rounded transition-colors duration-200 ease-in-out box-border w-40 ${
                  currentPath === `/admin/${item.name.toLowerCase()}`
                    ? "outline-none ring-2 ring-white rounded-md"
                    : "hover:bg-gray-700"
                }`}
              >
                <img src={item.img} alt="" className="py-2" />
                <button className="w-full text-left text-white hidden text-xl sm:block">
                  {item.name}
                </button>
              </Link>
            ))}
    </nav>
  );
}

export default Sidebar;
