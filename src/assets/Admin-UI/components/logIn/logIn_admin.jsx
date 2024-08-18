import React, { useState } from "react";
import userAdmin from "../data/userAdmin.json";
import { Link, useNavigate } from "react-router-dom";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import img from "../img/signupandlogin.jpg"

function LogIn() {
  const { dataUserName } = useAdminContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  console.log(dataUserName);
  const logIn = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      const user = dataUserName.find(
        (user) =>
          (user.email === username || (user.username === username)) &&
          user.password === password
      );
      if (user) {
        sessionStorage.setItem("customer", username);
        alert("Đăng nhập thành công");
        navigate("/test");
        return;
      }

      const admin = userAdmin.find(
        (admin) => admin.email === username && admin.password === password
      );
      if (admin) {
        alert("Đăng nhập ADMIN thành công");
        const getLicense = admin.license;
        sessionStorage.setItem("admin", getLicense);
        navigate("/");
      } else {
        alert("Đăng nhập thất bại");
      }
    }
  };

  const onSwitchToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src={img} className="w-2/3 h-2/3"/>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <form onSubmit={logIn} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Log in to Exclusive</h2>
            <div className="border-b-2 border-gray-300"></div>
          </div>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Email:
            </label>
            <input
              type="text"
              id="username"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Email or Phone Number"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password" className="block mb-1 font-medium">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="showPassword"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" className="text-sm font-medium">
                Show Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full p-2 bg-red-500 text-white rounded-md"
          >
            Log In
          </button>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-500"
              onClick={onSwitchToSignUp}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

const App = () => (
  <AdminProvider>
    <LogIn />
  </AdminProvider>
);

export default App;
