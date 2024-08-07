import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShoppingCartBody from "../components/shopping-cart/ShoppingCartBody";

function ShoppingCart() {
  return (
    <div>
      <Navbar />
      <ShoppingCartBody />
      <Footer />
    </div>
  );
}

export default ShoppingCart;
