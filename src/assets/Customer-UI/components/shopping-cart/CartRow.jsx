import React, { useState, useEffect } from "react";

function CartRow({ cartItem, setSubTotal, setItemList, itemList, ...props }) {
  const [quantity, setQuantity] = useState(cartItem[1].length);
  const [subTotalRow, setSubTotalRow] = useState(cartItem?.length);
  const oldValueRef = React.useRef(0);
  const quantityChange = () => {};

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex">
          <div className="image">
            {cartItem[1][0]?.img && (
              <img
                src={cartItem[1][0].img}
                alt={cartItem[0]}
                style={{ width: "30px", height: "30px" }}
              />
            )}
          </div>
          <div className="ml-2">{cartItem[0]}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        {cartItem[1][0]?.price ? `${cartItem[1][0].price} $` : null}
      </td>
      <td className="px-6 py-4">
        <input
          className="quantity w-16 px-2 py-1 border rounded"
          min="0"
          type="number"
          onChange={(e) => {
            const oldValue = oldValueRef.current;
            oldValueRef.current = e.target.value;
            setQuantity(e.target.value);
            const items = itemList.map((item) => {
              console.log(cartItem, item);
              if (cartItem[0] === item[0]) {
                item[2] = e.target.value;
              }
              return item;
            });
            setSubTotal((subtotal) => {
              console.log(subtotal);
              console.log(Number(e.target.value), Number(oldValue));
              if (Number(e.target.value) > Number(oldValue)) {
                return Math.round((Number(subtotal) + Number(cartItem[1][0].price)) * 100) / 100 ;
              } else {
                return Math.round((Number(subtotal) - Number(cartItem[1][0].price)) * 100) / 100;
              }
            });
          }}
          defaultValue={quantity}
        />
      </td>
      <td className="px-6 py-4">
        {subTotalRow ? `${Math.round(cartItem[1][0].price * quantity * 100) / 100} $` : null}
      </td>
    </tr>
  );
}

export default CartRow;
