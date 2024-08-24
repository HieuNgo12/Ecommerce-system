import React, { useEffect, useState } from "react";
import "./ShoppingCartBody.css";
import { Link } from "react-router-dom";
import CartRow from "./CartRow";
import Loading from "../utils/Loading";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

function ShoppingCartBody() {
  const [subTotal, setSubTotal] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCart, setUpdateCart] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const coupons = [
    {
      id: 1,
      title: "123456",
    },
    {
      id: 2,
      title: "123457",
    },
  ];
  useEffect(() => {
    const processData = () => {
      let subTotalOverall = 0;

      const cartList = JSON.parse(localStorage.getItem("cartList") || "[]"); // Default to an empty array if null
      let cartItemList = [];
      let quantityCartList = {};
      console.log(cartList);

      cartList.forEach((product) => {
        subTotalOverall += Number(product.price);
        if (quantityCartList[product.title]) {
          quantityCartList[product.title].push(product);
        } else {
          quantityCartList[product.title] = [product];
        }
      });

      for (const [key, value] of Object.entries(quantityCartList)) {
        cartItemList.push([key, value, value.length]);
      }
      setSubTotal(subTotalOverall);
      setItemList(cartItemList);
    };

    processData();
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [loading]);

  return (
    <div className="shopping-cart">
      {loading ? <Loading /> : null}
      <ul className="breadcrumb text-left">
        <li>Home</li>
        <li>Cart</li>
      </ul>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="table-head">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {itemList.length ? (
              itemList.map((cartItem) => (
                <CartRow
                  updateCart={updateCart}
                  key={cartItem[0]}
                  cartItem={cartItem}
                  itemList={itemList}
                  setSubTotal={setSubTotal}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Your cart is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <Link className="button-return-update mr-96" to={"/"}>
          Return to shop
        </Link>
        <button
          className="button-return-update ml-96 m-12"
          onClick={() => {
            setLoading(true);
            setUpdateCart((updateCart) => !updateCart);
          }}
        >
          Update Cart
        </button>
      </div>
      {couponMessage ? (
        coupons.filter((coupon) => {
          console.log(coupon.title?.toString(), couponCode);
          return coupon.title?.toString() === couponCode;
        }).length ? (
          <div className="text-left text-green-300">Successfully applied coupon message</div>
        ) : (
          <div className="text-left text-red-300">Failed to apply coupon message</div>
        )
      ) : null}
      <div className="coupon-code flex mb-80">
        <div className="mr-28">
          <input
            className="pl-4"
            onChange={(e) => {
              setCouponMessage(faSlidersH);
              setCouponCode(e.target.value);
            }}
            placeholder={"Coupon Code"}
          />
        </div>
        <div>
          <button
            className="apply-coupon"
            onClick={() => {
              setCouponMessage(true);
              setLoading(true);
            }}
          >
            Apply Coupon
          </button>
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
            <img src="./icons/long-line.png" alt="line" />
          </div>
          <div className="flex card-box">
            <div className="text-left text-very-left">Shipping</div>
            <div className="text-right">Free</div>
          </div>
          <div>
            <img src="./icons/long-line.png" alt="line" />
          </div>
          <div className="flex total-card">
            <div className="text-left">Total</div>
            <div className="total-right flex">
              <div>{Math.round(subTotal * 100) / 100}</div>
              <div>$</div>
            </div>
          </div>
          <div>
            <img src="./icons/long-line.png" alt="line" />
          </div>
          <div className="mt-8">
            <Link
              to={itemList.length ? "/billingpage" : "/shopping-cart"}
              className="proceed "
              onClick={() => {
                localStorage.setItem("billingList", JSON.stringify(itemList));
              }}
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartBody;
