import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./indexAdmin.css";
import Sidebar from "./components/sideBar/sideBar";
import Header from "./components/header/header";
import Dashboard from "./components/dashBoard/dashBoard";
import Products from "./components/products/products";
import Orders from "./components/orders/orders";
import Customers from "./components/customers/customers";
import Reviews from "./components/reviews/reviews";
import Promotion from "./components/promotion/promotion";
import { AdminProvider, useAdminContext } from "./AdminContext";
import AddProduct from "../Admin-UI/components/addProduct/addProduct";
import Analytics from "./components/analytics/analytics";
import Rating from "./components/rating/rating";

const AdminUI = () => {
  const { dataUserName, dataProducts, dataCart } = useAdminContext();

  return (
    <div>
      <div className="flex h-[73.563rem]">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="content flex-1">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/addproduct" element={<AddProduct />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/rating" element={<Rating />} />
              <Route path="/promotion" element={<Promotion />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <AdminProvider>
    <AdminUI />
  </AdminProvider>
);

export default App;
