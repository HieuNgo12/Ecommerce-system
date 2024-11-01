import React, { useEffect, useState } from "react";
import icon from "../svg/logout-2-svgrepo-com.svg";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import { Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import dataSideBar from "../data/dataSideBar";
import { ToastContainer, toast } from "react-toastify";
import refreshImg from "../svg/refresh-cw-alt-svgrepo-com.svg";
import { jwtDecode } from "jwt-decode";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // const setCookie = (name, value, days) => {
  //   let expires = "";
  //   if (days) {
  //     const date = new Date();
  //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  //     expires = "; expires=" + date.toUTCString();
  //   }
  //   document.cookie = name + "=" + (value || "") + expires + "; path=/";
  // };

  useEffect(() => {
    const getToken = getCookieValue("token");
    if (getToken) {
      // setToken(getToken);
      setUser(jwtDecode(getToken));
    } else {
      navigate("/login");
    }
  }, []);

  const searchInput = (e) => {
    setSearch(e.target.value);
  };

  const deleteCookie = (name) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const logOut = () => {
    deleteCookie("token");
    toast.warn("Log out successful", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => navigate("/login"),
    });
  };

  const addProduct = () => {
    navigate("/admin/products/addproduct");
  };

  const addPromotion = () => {
    navigate("/admin/promotion/addpromotion");
  };

  const addCustomers = () => {
    navigate("/admin/customers/addcustomers");
  };

  return (
    <div className="w-full p-6 bg-gray-100">
      <div className="w-full flex items-center justify-between pb-3">
        {dataSideBar.map(
          (item, index) =>
            currentPath === `/admin/${item.name.toLowerCase()}` && (
              <div
                key={index}
                className="text-gray-500"
              >{`Admin > ${item.name}`}</div>
            )
        )}
        {currentPath === `/admin/products/addproduct` && (
          <div className="text-gray-500">
            Admin {">"} Products {">"} Add Product
          </div>
        )}
        {currentPath === `/admin/promotion/addpromotion` && (
          <div className="text-gray-500">
            Admin {">"} Promotion {">"} Add Promotion
          </div>
        )}
        {currentPath === `/admin/customres/addcustomers` && (
          <div className="text-gray-500">
            Admin {">"} Customres {">"} Add Customres
          </div>
        )}

        <div className="flex items-center space-x-4">
          <span className="font-bold italic">{user.username}</span>
          <img src={icon} alt="" className="cursor-pointer" onClick={logOut} />
        </div>
      </div>

      <div className="w-full bg-gray-100 flex items-center justify-between">
        {dataSideBar.map(
          (item, index) =>
            currentPath === `/admin/${item.name.toLowerCase()}` && (
              <div key={index} className="text-3xl font-bold">
                {item.name}
              </div>
            )
        )}
        {currentPath === `/admin/products/addproduct` && (
          <div className="text-3xl font-bold">Add Product</div>
        )}
        {currentPath === `/admin/promotion/addpromotion` && (
          <div className="text-3xl font-bold">Add Promotion</div>
        )}
        {currentPath === `/admin/customres/addcustomers` && (
          <div className="text-3xl font-bold">Add Customres</div>
        )}

        <div className="flex gap-8">
          {currentPath === "/admin/products" && (
            <button
              className="bg-gray-800 p-2 rounded-md text-white hover:bg-gray-700"
              onClick={addProduct}
            >
              ADD PRODUCT
            </button>
          )}
          {currentPath === "/admin/promotion" && (
            <button
              className="bg-gray-800 p-2 rounded-md text-white hover:bg-gray-700"
              onClick={addPromotion}
            >
              ADD PROMOTION
            </button>
          )}
          {currentPath === "/admin/customers" && (
            <button
              className="bg-gray-800 p-2 rounded-md text-white hover:bg-gray-700"
              onClick={addCustomers}
            >
              ADD CUSTOMERS
            </button>
          )}
          <input
            type="text"
            className="rounded-md p-2 hidden sm:block"
            placeholder="Search"
            onChange={searchInput}
            value={search}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const HeaderUI = () => {
  return (
    <AdminProvider>
      <Header />
    </AdminProvider>
  );
};
export default HeaderUI;
