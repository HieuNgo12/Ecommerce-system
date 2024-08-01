import React, { useState } from "react";
import dataSideBar from "../data/dataSideBar";
import userAdmin from "../data/userAdmin.json";

function Sidebar({ onComponentChange }) {
  let [active, setActive] = useState(dataSideBar[0].name);

  return (
    <nav className="bg-gray-800 text-white p-4 space-y-2 w-36">
      <h2 className="text-3xl font-bold">ADMIN</h2>
      <div className="border-b-2 border-white mb-2"></div>

      {dataSideBar.map((item) => (
        <div
          key={item.id}
          className={`flex justify-start items-center cursor-pointer py-2 px-1 gap-2 rounded transition-colors duration-200 ease-in-out box-border ${
            active === item.name
              ? "outline-none ring-2 ring-white rounded-md"
              : "hover:bg-gray-700"
          }`}
          onClick={() => {
            onComponentChange(item.name);
            setActive(item.name);
          }}
        >
          <img src={item.img} alt="" className="py-2" />
          <button
            className={`w-full  text-left`}
          >
            {item.name}
          </button>
        </div>
      ))}
    </nav>
  );
}

export default Sidebar;
