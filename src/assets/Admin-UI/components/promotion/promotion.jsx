import React from "react";
import sort from "../svg/icon-sort-vertical-svgrepo-com.svg";

function Promotion({dataPromotion}) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-2 border-b border-r w-10">
                <img src={sort} alt="" className="w-9 h-9" />
              </th>
              <th className="py-2 px-4 border-b border-r">Order</th>
              <th className="py-2 px-4 border-b border-r">Date</th>
              <th className="py-2 px-4 border-b border-r">Total</th>
              <th className="py-2 px-4 border-b border-r">Status</th>
              <th className="py-2 px-4 border-b border-r w-[5.3125rem]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dataPromotion.map((order, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-r">{index + 1}</td>
                <td className="py-2 px-4 border-b border-r">{order.order}</td>
                <td className="py-2 px-4 border-b border-r">{order.date}</td>
                <td className="py-2 px-4 border-b border-r">{order.total}</td>
                <td className="py-2 px-4 border-b border-r">{order.status}</td>
                <td className="py-2 px-4 border-b border-r">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Promotion;
