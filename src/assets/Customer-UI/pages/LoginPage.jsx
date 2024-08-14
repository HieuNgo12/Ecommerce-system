import React from "react";
import Navbar from "../components/Navbar";
import ShoppingCartBody from "../components/shopping-cart/ShoppingCartBody";
import Footer from "../components/Footer";
import LoginPageBody from "../components/login-page/LoginPageBody";

function LoginPage() {
  return (
    <div>
      {" "}
      <Navbar />
      <LoginPageBody />
      <Footer />
    </div>
  );
}

export default LoginPage;
