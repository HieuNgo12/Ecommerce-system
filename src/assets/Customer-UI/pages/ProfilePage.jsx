import React from "react";
import Navbar from "../components/Navbar";
import ShoppingCartBody from "../components/shopping-cart/ShoppingCartBody";
import Footer from "../components/Footer";
import ProfilePageBody from "../components/edit-page/ProfilePageBody";

function ProfilePage() {
  return (
    <div>
      {" "}
      <Navbar />
      <ProfilePageBody />
      <Footer />
    </div>
  );
}

export default ProfilePage;
