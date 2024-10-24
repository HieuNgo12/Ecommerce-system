import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BillingPageBody from "../components/billing-page/BillingPageBody";
import DeliveryPageBody from '../components/delivery-page/DeliveryPageBody';
function DeliveryPage() {
  return (
    <div> <Navbar />
    <DeliveryPageBody />
    <Footer /></div>
  )
}

export default DeliveryPage