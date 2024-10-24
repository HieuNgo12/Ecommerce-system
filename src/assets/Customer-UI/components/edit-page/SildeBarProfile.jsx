import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Sidebar() {
  const list = [
    { name: "My Profile", value: "my-profile" },
    { name: "My Authorization", value: "my-authorization" },
    { name: "My Password", value: "my-password" },
    { name: "My Orders", value: "orders" },
    { name: "My Payment Options", value: "payment" },
    { name: "My Purchase History", value: "purchase" },
    { name: "My Wishlist", value: "wishlist" },
    { name: "My Setting", value: "setting" },
  ];
  const location = useLocation();

  // console.log(location);
  const currentPath = location.pathname;

  const handleCick = (xxx) => {
    // const navigate = useNavigate();
  };

  return (
    <div
      style={{
        width: "25%", // Đặt sidebar chiếm 25% chiều rộng
        paddingRight: "20px",
        borderRight: "1px solid #ccc",
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {list.map((item, index) => {
          return (
            <li
              key={index}
              style={{ marginBottom: "15px" }}
              onClick={() => handleCick(index)}
            >
              <Link to={`/profile/${item.value}`}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;