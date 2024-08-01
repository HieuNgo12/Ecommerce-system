import React from "react";
import sort from "../svg/icon-sort-vertical-svgrepo-com.svg";

const Orders = ({ dataCart }) => {



  console.log(dataCart);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
          <th className="py-2 px-2 border-b border-r w-10">
              <img src={sort} alt="" className="w-9 h-9"/>
            </th>
            <th className="py-2 px-2 border-b border-r">User ID</th>
            <th className="py-2 px-4 border-b border-r">Date</th>
            <th className="py-2 px-4 border-b border-r">Product ID</th>
            <th className="py-2 px-4 border-b border-r">Quanlity</th>
            <th className="py-2 px-4 border-b border-r">Price</th>
            <th className="py-2 px-4 border-b border-r">Total</th>
            <th className="py-2 px-4 border-b border-r w-[5.3125rem]">
                Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dataCart.map((order, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-r">{index + 1}</td>
              <td className="py-2 px-4 border-b border-r">{order.userId}</td>
              <td className="py-2 px-4 border-b border-r">{order.date}</td>
              <td className="py-2 px-4 border-b border-r">
                {order.products.map((product, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="block ">{product.productId}</span>
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border-b border-r">
              {order.products.map((product, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="block">{product.quantity}</span>
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border-b border-r">...</td>
              <td className="py-2 px-4 border-b border-r">...</td>
              <td className="py-2 px-4 border-b border-r cursor-pointer">...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
