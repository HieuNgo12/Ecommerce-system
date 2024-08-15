import React, { useEffect, useState } from "react";
import icon from "../svg/logout-2-svgrepo-com.svg";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import { Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import dataSideBar from "../data/dataSideBar";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [licenseAdmin, setlicenseAdmin] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getLicenseFromSS = sessionStorage.getItem("admin");
    if (getLicenseFromSS) {
      setlicenseAdmin(getLicenseFromSS);
    }
  }, []);

  const searchInput = (e) => {
    setSearch(e.target.value);
  };

  const logOut = () => {
    sessionStorage.removeItem("admin");
    alert("Đăng xuất thành công!");
    navigate("/login");
  };

  const addProduct = () => {
    navigate("/products/addproduct");
  };

  return (
    <div className="w-full p-6 bg-gray-100">
      <div className="w-full flex items-center justify-between pb-3">
        {dataSideBar.map(
          (item, index) =>
            currentPath === `/${item.name.toLowerCase()}` && (
              <div
                key={index}
                className="text-gray-500"
              >{`Admin > ${item.name}`}</div>
            )
        )}
        {currentPath === `/products/addproduct` && (
          <div className="text-gray-500">
            Admin {">"} Products {">"} Add Product
          </div>
        )}
        <div className="flex items-center space-x-4">
          <span className="font-bold italic">{licenseAdmin}</span>
          <img src={icon} alt="" className="cursor-pointer" onClick={logOut} />
        </div>
      </div>

      <div className="w-full bg-gray-100 flex items-center justify-between">
        {dataSideBar.map(
          (item, index) =>
            currentPath === `/${item.name.toLowerCase()}` && (
              <div key={index} className="text-3xl font-bold">
                {item.name}
              </div>
            )
        )}
        {currentPath === `/products/addproduct` && (
          <div className="text-3xl font-bold">Add Product</div>
        )}

        <div className="flex gap-8">
          {currentPath === "/products" && (
            <button
              className="bg-gray-800 p-2 rounded-md text-white hover:bg-gray-700"
              onClick={addProduct}
            >
              ADD PRODUCT
            </button>
          )}
          <input
            type="text"
            className="rounded-md p-2"
            placeholder="Search"
            onChange={searchInput}
            value={search}
          />
        </div>
      </div>
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
