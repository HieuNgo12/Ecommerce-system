import React from "react";
import sort from "../svg/icon-sort-vertical-svgrepo-com.svg";

const Customers = ({ dataUserName }) => {
  console.log(dataUserName);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
          <th className="py-2 px-2 border-b border-r w-10">
              <img src={sort} alt="" className="w-9 h-9"/>
            </th>
            <th className="py-2 px-4 border-b border-r">ID</th>
            <th className="py-2 px-4 border-b border-r">Email</th>
            <th className="py-2 px-4 border-b border-r">UserName</th>
            <th className="py-2 px-4 border-b border-r">Password</th>
            <th className="py-2 px-4 border-b border-r">Total Paid</th>
            <th className="py-2 px-4 border-b border-r w-[5.3125rem]">
                Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dataUserName.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-r">{index + 1}</td>
              <td className="py-2 px-4 border-b border-r">{item.id}</td>
              <td className="py-2 px-4 border-b border-r">{item.email}</td>
              <td className="py-2 px-4 border-b border-r">{item.username}</td>
              <td className="py-2 px-4 border-b border-r">{item.password}</td>
              <td className="py-2 px-4 border-b border-r">...</td>
              <td className="py-2 px-4 border-b border-r cursor-pointer">...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
