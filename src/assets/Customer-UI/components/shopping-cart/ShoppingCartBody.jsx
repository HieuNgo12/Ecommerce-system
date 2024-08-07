import React from "react";
import "./ShoppingCartBody.css";
function ShoppingCartBody() {
  return (
    <div>
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
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="flex">
                  <div className="image">
                    <img  src={"./public/icons/computer.png"} />
                  </div>
                  <div className="">LCD Monitor</div>
                </div>
              </th>
              <td class="px-6 py-4">$650</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$650</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button className="button-return-update mr-96">Return to shop</button>
        <button className="button-return-update ml-96 m-12">
          Update To Cart
        </button>
      </div>
      <div className="coupon-code flex mb-80 ">
        <div className="mr-28">
          <input placeholder={"Coupon Code"} />
        </div>
        <div>
          <button className="apply-coupon">Apply Coupon</button>
        </div>

        <div className="cart-card">
          <div className="cart-total">Cart total</div>
          <div className="flex">
            <div>Subtotal</div>
            <div className="text-right">$1750</div>
          </div>
          <div>
            <img src="./public/icons/long-line.png" />
          </div>
          <div className="flex">
            <div>Shipping</div>
            <div className="text-right">Free</div>
          </div>
          <div>
            <img src="./public/icons/long-line.png" />
          </div>
          <div className="flex">
            <div>Total</div>
            <div className="text-right">$1750</div>
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
