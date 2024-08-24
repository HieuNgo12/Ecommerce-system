import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
import Rating from "./components/rating/rating";
import Quotes from "./components/quotes/quotes";
import AddPromotion from "./components/addPromotion/addPromotion";
import BackUp from "./components/backUp/backUp";
import Setting from "./components/setting/setting";
import Help from "./components/help/help";
import Analytics from "./components/analytics/analytics";
import AddCustomers from "./components/addCustomers/addCustomers";

const AdminUI = () => {
  // const { dataUserName, dataProducts, dataCart } = useAdminContext();

  return (
    <div className="h-full flex w-full">
      <Sidebar />
      <div className="flex flex-col w-full overflow-hidden">
        <Header />
        <div>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/addproduct" element={<AddProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/addcustomers" element={<AddCustomers />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/promotion/addpromotion" element={<AddPromotion />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/backup" element={<BackUp />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/help" element={<Help />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
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
