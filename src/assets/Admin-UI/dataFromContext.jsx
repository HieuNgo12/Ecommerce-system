import React from "react";
import Products from "./components/products/products";
import AddProduct from "./components/addProduct/addProduct";
import Customers from "./components/customers/customers"
import Review from "./components/reviews/reviews"
import Dashboard from "./components/dashBoard/dashBoard"
import Orders from "./components/orders/orders"
import Promotion from "./components/promotion/promotion";
import Rating from "./components/rating/rating";
import { AdminProvider } from "./AdminContext";
import AdminUI from "./AdminUI"

const App = () => {
  return (
    <AdminProvider>
      {/* <Products />
      <AddProduct />
      <AdminUI />
      <Customers />
      <Review />
      <Dashboard />
      <Orders />
      <Promotion />
      <Rating /> */}
    </AdminProvider>
  );
};

export default App;
