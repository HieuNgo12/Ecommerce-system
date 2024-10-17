import React, { useState } from "react";
import userAdmin from "../data/userAdmin.json";
import { Link, useNavigate } from "react-router-dom";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import img from "../img/signupandlogin.jpg";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../../Customer-UI/components/Footer";
import Navbar from "../../../Customer-UI/components/Navbar";

function LogIn() {
  // const { dataUserName } = useAdminContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const logIn = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        // "Authorization": `Bearer ${token}`,
        // credentials: "include",
      });

      const res = await req.json();
      console.log(res.data);
      const token = res.data;

      localStorage.setItem("accessToken", token);

      const decodeToken = (token) => {
        const payloadBase64 = token.split(".")[1];
        return JSON.parse(atob(payloadBase64)); // Giải mã payload
      };
      const userData = decodeToken(token);
      console.log(userData);

      if (req.status === 200) {
        if (userData.role === "admin")
          toast.success(res.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              navigate("/admin");
            },
          });

        if (userData.role === "user")
          toast.success(res.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              navigate("/");
            },
          });
      } else {
        toast.warn(res.message, {
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
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong, please try again.", {
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
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

const App = () => (
  <AdminProvider>
    <LogIn />
  </AdminProvider>
);

export default App;
