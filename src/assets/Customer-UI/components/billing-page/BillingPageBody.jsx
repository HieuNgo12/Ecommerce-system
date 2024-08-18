import React, { useEffect, useState } from "react";
import "./BillingPageBody.css";
import { Link } from "react-router-dom";

function ShoppingCartBody() {
  const [subTotal, setSubTotal] = useState(0);
  const [itemList, setItemList] = useState([]);

  let subTotalOverall = 0;
  useEffect(() => {
    const processData = () => {
      const cartList = JSON?.parse(localStorage?.getItem("cartList"));
      let cartItemList = [];
      let quantityCartList = {};
      cartList.forEach((product) => {
        console.log(quantityCartList, quantityCartList[product.title], product);
        subTotalOverall += Number(product.price);
        if (quantityCartList[product.title]) {
          quantityCartList[product.title].push(product);
        } else {
          quantityCartList[product.title] = [product];
        }
      });
      for (const [key, value] of Object.entries(quantityCartList)) {
        cartItemList.push([key, value]);
      }
      setItemList(cartItemList);
    };
    processData();
  }, []);

  return (
    <div className=" shopping-cart">
      <ul className="breadcrumb text-left">
        <li>Account</li>
        <li>My Account</li>
        <li>Product</li>
        <li>View Cart</li>
        <li>Checkout</li>
      </ul>
      <div className="flex">
        <div>
            <h1>Billing Details</h1>
            
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default ShoppingCartBody;
