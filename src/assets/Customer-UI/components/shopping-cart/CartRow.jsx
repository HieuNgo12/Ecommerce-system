import React, { useState, useEffect } from "react";

function CartRow({ cartItem, setSubTotal, ...props }) {
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
            setSubTotal((subtotal) => {
              return subtotal + (cartItem[1][0].price * e.target.value - cartItem[1][0].price * oldValue);
            });
          }}
          defaultValue={quantity}
        />
      </td>
      <td className="px-6 py-4">
        {subTotalRow ? `${subTotalRow.toFixed(2)} $` : null}
      </td>
    </tr>
  );
}

export default CartRow;