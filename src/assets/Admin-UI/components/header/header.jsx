import React, { useEffect, useState } from "react";
import icon from "../svg/logout-2-svgrepo-com.svg";

function Header({ license, logOut, activeView }) {
  const [licenseAdmin, setlicenseAdmin] = useState("");
  const [search, setSearch] = useState('')

  useEffect(() => {
    setlicenseAdmin(license);
  }, [license]);


  const searchInput = (e) =>{
    setSearch(e.target.value)
  }
  console.log(search)
  
  return (
    <div className="w-full p-6 bg-gray-100">
      <div className="w-full flex items-center justify-between pb-3">
        <div className="text-gray-500">{`Admin > ${activeView}`}</div>
        <div className="flex items-center space-x-4">
          <span className="font-bold italic">{licenseAdmin}</span>
          <img src={icon} alt="" className="cursor-pointer" onClick={logOut} />
        </div>
      </div>
      <div className="w-full bg-gray-100 flex items-center justify-between">
        <div className="text-3xl font-bold">{activeView}</div>
        <div className="flex gap-8">
          <button className="bg-gray-800 p-2 rounded-md text-white">ADD PRODUCT</button>
          <input type="text" className="rounded-md px-3" placeholder="Search" onChange={searchInput} value={search}/>
        </div>
      </div>
    </div>
  );
}

export default Header;
