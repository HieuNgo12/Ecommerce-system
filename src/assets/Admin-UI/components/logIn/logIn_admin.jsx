import React, { useEffect, useState } from "react";
import userAdmin from "../data/userAdmin.json";

function LogIn({
  getLicenseLogIn,
  dataLogin,
  onLoginSuccess,
  onSwitchToSignUp,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [license, setLicense] = useState();


  const logIn = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      for (let j = 0; j < userAdmin.length; j++) {
        userAdmin[j].email === username ? adminLayout() : customersLayout();
      }
    }
  };

  const customersLayout = () => {
    const user = dataLogin.find((user) => {
      return user.email === username && user.password === password;
    });
    if (user) {
      alert("Đăng nhập thành công");
      window.location.href = "https://www.youtube.com/";
      sessionStorage.setItem("customer", username);
    }
  };

  const adminLayout = () => {
    const adminCheck = userAdmin.find((check) => {
      return check.email === username && check.passWord === password;
    });
    if (adminCheck) {
      alert("Đăng nhập ADMIN thành công");
      onLoginSuccess();
      checkAdminLogin();
    }
  };

  const checkAdminLogin = () => {
    const admin = userAdmin.find((user) => user.email === username);
    if (admin) {
      const getLicense = admin.license;
      setLicense(getLicense);
      sessionStorage.setItem("admin", getLicense);
      sessionStorage.setItem("admin", license);
      getLicenseLogIn(getLicense);
    } else {
      console.log("Không tìm thấy tài khoản:", username);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
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

export default LogIn;
