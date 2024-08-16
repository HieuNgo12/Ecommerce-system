import React, { useState } from 'react'

function CartRow({cartItem, ...props}) {
    const [quantity,setQuantity] = useState(cartItem?.length)
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
                    {cartItem[1][0]?.price ? cartItem[1][0].price + " $" : null}
                  </td>
                  <td class="px-6 py-4">
                    <input
                      className="quantity"
                      min="0"
                      type="number"
                      onChange={(e)=>{setQuantity(e.target.value)}}
                      defaultValue={quantity}
                    />
                  </td>
                  <td class="px-6 py-4">
                    {" "}
                    {cartItem[1][0]?.price
                      ? (Math.round(cartItem[1][0].price * quantity) * 100) / 100 + " $"
                      : null}
                  </td>
                </tr>
  )
}

export default CartRow