import React from "react";
import Navbar from "../components/Navbar";
import OrderPageBody from "../components/order-page/OrderPageBody";
import Footer from "../components/Footer";

function OrderPage() {
  return (
    <div>
      {" "}
      <Navbar />
      <OrderPageBody />
      <Footer />
    </div>
  );
}

export default OrderPage;
