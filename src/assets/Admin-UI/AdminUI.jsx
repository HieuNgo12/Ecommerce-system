import React from "react";
import "./indexAdmin.css";
import LogIn from "./components/logIn/logIn_admin";
import SignUp from "./components/signUp/signUp_admin";
import Sidebar from "./components/sideBar/sideBar";
import Header from "./components/header/header";
import Dashboard from "./components/dashBoard/dashBoard";
import Products from "./components/products/products";
import Orders from "./components/orders/orders";
import Customers from "./components/customers/customers";
import Reviews from "./components/reviews/reviews";
import Promotion from "./components/promotion/promotion";
import ReactPaginate from "react-paginate";
import { AdminProvider, useAdminContext } from "./AdminContext";

const AdminUI = () => {
  const {
    isLoggedIn,
    handleLoginSuccess,
    activeComponent,
    handleComponentChange,
    isSignUp,
    switchToSignUp,
    switchToLogIn,
    dataUserName,
    paginatedProducts,
    dataCart,
    license,
    getLicense,
    logOut,
    handlePageClick,
    productsPerPage,
    dataProducts
  } = useAdminContext();

  


  return (
    <div>
      {!isLoggedIn ? (
        isSignUp ? (
          <SignUp onSwitchToLogIn={switchToLogIn} />
        ) : (
          <LogIn
            dataLogin={dataUserName}
            onLoginSuccess={handleLoginSuccess}
            onSwitchToSignUp={switchToSignUp}
            getLicenseLogIn={getLicense}
          />
        )
      ) : (
        <div className="flex h-screen">
          <Sidebar onComponentChange={handleComponentChange} />
          <div className="flex flex-col flex-1">
            <Header license={license} logOut={logOut} activeView={activeComponent}/>
            <div className="content flex-1 overflow-auto ">
              {activeComponent === "Dashboard" && <Dashboard />}
              {activeComponent === "Products" && (
                <>
                  <Products dataProducts={paginatedProducts} />
                  <div className="pagination-container">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={Math.ceil(
                        dataProducts.length / productsPerPage
                      )}
                      previousLabel="< previous"
                      renderOnZeroPageCount={null}
                      containerClassName="pagination"
                      pageClassName="pagination-item"
                      pageLinkClassName="pagination-link"
                      previousClassName="pagination-item"
                      previousLinkClassName="pagination-link"
                      nextClassName="pagination-item"
                      nextLinkClassName="pagination-link"
                      breakClassName="pagination-item"
                      breakLinkClassName="pagination-link"
                      activeClassName="active"
                    />
                  </div>
                </>
              )}
              {activeComponent === "Orders" && <Orders dataCart={dataCart} />}
              {activeComponent === "Customers" && (
                <Customers dataUserName={dataUserName} />
              )}
              {activeComponent === "Promotion" && (
                <Promotion dataPromotion={paginatedProducts} />
              )}
              {activeComponent === "Reviews" && <Reviews />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminApp = () => (
  <AdminProvider>
    <AdminUI />
  </AdminProvider>
);

export default AdminApp;
