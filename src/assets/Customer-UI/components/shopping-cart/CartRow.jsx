import React, { useState, useEffect } from "react";
import "./CartRow.css";
import Modal from "../utils/Modal";
function CartRow({
  updateCart,
  cartItem,
  setSubTotal,
  setItemList,
  itemList,
  ...props
}) {
  const [quantity, setQuantity] = useState(cartItem[1].length);
  const [subTotalRow, setSubTotalRow] = useState(cartItem?.length);
  const [open, setOpen] = React.useState(false);
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const oldValueRef = React.useRef(0);
  const quantityChange = () => {};
  const deleteItemRow = (title) => {
    let cartList = JSON.parse(localStorage.getItem("cartList"));
    let filterList = cartList.filter((item) => {
      if (item.title !== title) {
        return item;
      }
    });

    localStorage.setItem("cartList", JSON.stringify(filterList));

    window.location.reload();
  };
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {couponMessage ? (
        coupons.filter((coupon) => {
          return coupon.title?.toString() === couponCode;
        }).length ? (
          <div className="text-left">Successfully applied coupon message</div>
        ) : (
          <div className="text-left">Failed to apply coupon message</div>
        )
      ) : null}
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Modal
          handleClose={handleClose}
          open={open}
          setOpen={setOpen}
          deleteItemRow={deleteItemRow}
          cartItem={cartItem}
        />
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
          min="1"
          type="number"
          disabled={updateCart}
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
              if (Number(e.target.value) > Number(oldValue)) {
                return (
                  Math.round(
                    (Number(subtotal) + Number(cartItem[1][0].price)) * 100 
                  ) / 100 
                );
              } else {
                return (
                  Math.round(
                    (Number(subtotal) - Number(cartItem[1][0].price)) * 100
                  ) / 100
                );
              }
            });
          }}
          defaultValue={quantity}
        />
      </td>
      <td className="px-6 py-4">
        {subTotalRow
          ? `${Math.round(cartItem[1][0].price * quantity) || 0 / 100} $`
          : null}
      </td>
      {!updateCart ? (
        <td className="px-6 py-4">
          <img
            style={{ width: "25px", height: "25px" }}
            className="trash-can"
            src={"./icons/social-media/trash-can.png"}
            onClick={() => {
              setOpen(true);
            }}
          />
        </td>
      ) : null}
    </tr>
  );
}

export default CartRow;