import React, { useEffect, useState } from "react";
import "./ShoppingCartBody.css";
import { Link } from "react-router-dom";
import CartRow from "./CartRow";

function ShoppingCartBody() {
  const [subTotal, setSubTotal] = useState(0);
  const [itemList, setItemList] = useState([]);

  let subTotalOverall = 0;
  useEffect(()=> {
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
      setItemList(cartItemList)
    };
    processData();
  }, [])

  return (
    <div className="shopping-cart">
      {" "}
      <ul className="breadcrumb text-left">
        <li>Home</li>
        <li>Cart</li>
      </ul>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {itemList.length && itemList.map((cartItem) => {
              return <CartRow cartItem={cartItem} setSubTotal={setSubTotal} />;
            })}
          </tbody>
        </table>
      </div>
      <div>
        <a className="button-return-update mr-96">
          <Link to={"/"}>Return to shop</Link>
        </a>
        <button className="button-return-update ml-96 m-12">
          Update To Cart
        </button>
      </div>
      <div className="coupon-code flex mb-80 ">
        <div className="mr-28">
          <input className="pl-4" placeholder={"Coupon Code"} />
        </div>
        <div>
          <button className="apply-coupon ">Apply Coupon</button>
        </div>

        <div className="cart-card">
          <div className="cart-total text-very-left">Cart total</div>
          <div className="flex card-box">
            <div className="text-left text-very-left">Subtotal</div>
            <div className="text-right flex">
              <div>{Math.round(subTotal * 100) / 100}</div>
              <div>$</div>
            </div>
          </div>
          <div>
            <img src="./public/icons/long-line.png" />
          </div>
          <div className="flex card-box">
            <div className="text-left text-very-left">Shipping</div>
            <div className="text-right">Free</div>
          </div>
          <div>
            <img src="./public/icons/long-line.png" />
          </div>
          <div className="flex  total-card">
            <div className="text-left">Total</div>
            <div className="total-right flex">
              <div>{Math.round(subTotal * 100) / 100}</div>
              <div>$</div>
            </div>
          </div>
          <div>
            <img src="./public/icons/long-line.png" />
          </div>
          <div>
            <button className="proceed">Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartBody;
