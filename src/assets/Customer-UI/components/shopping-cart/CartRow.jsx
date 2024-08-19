import React, { useState, useEffect } from "react";

function CartRow({ cartItem, setSubTotal, ...props }) {
  const [quantity, setQuantity] = useState(0);
  const [subTotalRow, setSubTotalRow] = useState(0);

  useEffect(() => {
    // Calculate the total quantity for this specific item
    const totalQuantity = cartItem[1].reduce((acc, item) => acc + (item.quantity || 1), 0);
    setQuantity(totalQuantity);
    
    // Calculate the subtotal for this row
    const itemPrice = cartItem[1][0]?.price || 0;
    const newSubTotalRow = itemPrice * totalQuantity;
    setSubTotalRow(newSubTotalRow);
  }, [cartItem]);

  const quantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);

    // Update localStorage
    const cartList = JSON.parse(localStorage.getItem("cartList") || "[]");
    const updatedCartList = cartList.map(item => {
      if (item.title === cartItem[0]) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    localStorage.setItem("cartList", JSON.stringify(updatedCartList));

    // Update subtotal
    const itemPrice = cartItem[1][0]?.price || 0;
    const newSubTotalRow = itemPrice * newQuantity;
    setSubTotalRow(newSubTotalRow);
    setSubTotal(prev => prev - (itemPrice * quantity) + newSubTotalRow);
  };

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
          onChange={quantityChange}
          value={quantity}
        />
      </td>
      <td className="px-6 py-4">
        {subTotalRow ? `${subTotalRow.toFixed(2)} $` : null}
      </td>
    </tr>
  );
}

export default CartRow;