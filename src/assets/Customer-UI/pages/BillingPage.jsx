import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BillingPageBody from "../components/billing-page/BillingPageBody";

function BillingPage() {
  return (
    <div>
      <Navbar />
      <BillingPageBody />
      <Footer />
    </div>
  );
}

export default BillingPage;
