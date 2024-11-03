import React, { useState } from "react";
import "./OrderPageBody.css";
import OrderModal from "./OrderModal";
function OrderPageBody() {
  const [subTotal, setSubTotal] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const delivery = [
    {
      title: "Order Placed",
      date: "07/10/1998",
    },
    {
      title: "Order Paid",
      date: "15/10/1998",
    },
    {
      title: "Order Shipped Out",
      date: "21/10/1998",
    },
    {
      title: "Order Received",
      date: "26/10/1998",
      checked: true
    },
    
    {
      title: "Order Received",
      date: "26/10/1998",
    },   
  ];
  return (
    <div className=" shopping-cart">
      {/* <form onSubmit={formik.handleSubmit}> */}
      {loading && <Loading />}
      <ul className="breadcrumb text-left">
        <li>Account</li>
        <li>My Account</li>
        <li>Product</li>
        <li>View Cart</li>
        <li className="bold">Checkout</li>
      </ul>

      <div className="flex text-left">
        <div className="ml-10 mr-10">
          <div className="head-link">Manage My account</div>
          <ul className="mt-5">
            <li >My Profile</li>
            <li>Address Book</li>
            <li>My Payment Option</li>
          </ul>
          <div className="head-link mt-5 profile">My Orders</div>
          <ul className="mt-5">
            <li>My Returns</li>
            <li>My Cancellations</li>
          </ul>
          <div className="head-link mt-5">My Wishlist</div>
        </div>
        <div className="flex words-left ">
          <div>
            <h1 className="billing-details">My Orders</h1>
            <div className="flex delivery-history">
              <div>Order Placed ---</div>
              <div>Order Paid ---</div>
              <div>Order Shipped Out ---</div>
              <div>Order Received ---</div>
              <div>Order Completed ---</div>
            </div>
            <OrderModal />
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}

export default OrderPageBody;
