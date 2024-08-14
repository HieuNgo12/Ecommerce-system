import React from "react";
import "./ShoppingCartBody.css";

function ShoppingCartBody() {
  const cartList = JSON?.parse(localStorage?.getItem("cartList"));
  let quantityCartList = {};
  let cartItemList = [];
  cartList.forEach((product) => {
    for (let i = 0; i < quantityCartList.length; i++) {}
    if (quantityCartList[product.title]) {
      quantityCartList[product.title].push(product);
    } else {
      quantityCartList[product.title] = [];
    }
  });

  for (const [key, value] of Object.entries(quantityCartList)) {
    console.log(`${key}: ${value}`);
    cartItemList.push([key, value]);
  }
  console.log(quantityCartList, cartItemList);
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
            {cartItemList.map((cartItem) => {
              console.log(cartItem[1][0]);
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="flex">
                      <div className="image">
                        {cartItem[1][0]?.img ? (
                          <img
                            src={cartItem[1][0].img}
                            style={{ width: "30px", height: "30px" }}
                          />
                        ) : null}
                      </div>
                      <div className="">{cartItem[0]}</div>
                    </div>
                  </th>
                  <td class="px-6 py-4">
                    {cartItem[1][0]?.price ? cartItem[1][0].price : null}
                  </td>
                  <td class="px-6 py-4">
                    <input
                      className="quantity"
                      min="0"
                      type="number"
                      defaultValue={cartItem[1].length}
                    />
                  </td>
                  <td class="px-6 py-4">
                    {" "}
                    {cartItem[1][0]?.price ? cartItem[1][0].price * cartItem[1].length : null}
                  </td>
                </tr>
              );
            })}
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
          <div className="cart-total text-very-left">Cart total</div>
          <div className="flex card-box">
            <div className="text-left text-very-left">Subtotal</div>
            <div className="text-right">$1750</div>
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
          <div className="flex card-box">
            <div className="text-left">Total</div>
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
