import React, { useState } from "react";
import userAdmin from "../data/userAdmin.json";
import { Link, useNavigate } from "react-router-dom";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import img from "../img/signupandlogin.jpg";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../../Customer-UI/components/Footer";
import Navbar from "../../../Customer-UI/components/Navbar";

function LogIn({ setUser, ...props }) {
  const { dataUserName } = useAdminContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  console.log(dataUserName);
  const logIn = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      toast.warn("Vui lòng nhập đầy đủ thông tin", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const user = dataUserName.find(
        (user) =>
          (user.email === username || user.username === username) &&
          user.password === password
      );
      if (user) {
        setUser("customer");

        sessionStorage.setItem("customer", username);
        toast.success("Đăng nhập thành công", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => navigate("/"),
        });
        return;
      }

      const admin = userAdmin.find(
        (admin) => admin.email === username && admin.password === password
      );
      if (admin) {
        const getLicense = admin.license;
        setUser("admin");

        sessionStorage.setItem("admin", getLicense);
        toast.success("Đăng nhập ADMIN thành công", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => navigate("/admin"),
        });
      } else {
        toast.error("Đăng nhập thất bại", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const onSwitchToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex items-center space-y-4 gap-10">
        <img src={img} className="w-2/3" />
        <div className="bg-white shadow-lg rounded-lg p-8 w-1/3">
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
            <div className="flex flex-col items-center space-y-4">
              <button
                type="submit"
                className="block w-full p-2 bg-red-500 text-white rounded-md"
              >
                Log In
              </button>
              <button
                type="button"
                className="text-blue-500"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>
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
      <Footer />
      <ToastContainer />
    </div>
  );
}

const App = ({ setUser, ...props }) => (
  <AdminProvider>
    <LogIn setUser={setUser} />
  </AdminProvider>
);

export default App;
