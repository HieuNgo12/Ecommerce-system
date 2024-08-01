import React, { createContext, useState, useEffect, useContext } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [isSignUp, setIsSignUp] = useState(false);
  const [dataUserName, setDataUserName] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [dataCart, setDataCart] = useState([]);
  const [license, setLicense] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;

  const callApi = async () => {
    try {
      const response1 = await fetch("https://fakestoreapi.com/users");
      const result1 = await response1.json();
      const response2 = await fetch("https://fakestoreapi.com/products");
      const result2 = await response2.json();
      const response3 = await fetch("https://fakestoreapi.com/carts");
      const result3 = await response3.json();
      setDataUserName(result1);
      setDataProducts(result2);
      setDataCart(result3);
      console.log(result2)
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
  };

  const switchToLogIn = () => {
    setIsSignUp(false);
  };

  const getLicense = (xxx) => {
    setLicense(xxx);
  };

  const logOut = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("admin");
    alert("Đăng xuất thành công!");
    setIsLoggedIn(false);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const paginatedProducts = dataProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  useEffect(() => {
  }, [dataProducts, paginatedProducts]);

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn,
        handleLoginSuccess,
        activeComponent,
        handleComponentChange,
        isSignUp,
        switchToSignUp,
        switchToLogIn,
        dataUserName,
        dataProducts,
        paginatedProducts,
        dataCart,
        license,
        getLicense,
        logOut,
        currentPage,
        handlePageClick,
        productsPerPage
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
