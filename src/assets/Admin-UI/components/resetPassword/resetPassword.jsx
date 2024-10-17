import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Customer-UI/components/Footer";
import Navbar from "../../../Customer-UI/components/Navbar";
import img from "../img/signupandlogin.jpg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOTP = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch(
        "http://localhost:8080/api/v1/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: otp,
            password: password,
            confirm: confirm,
          }),
        }
      );
      const res = await req.json();
      if (req.status === 200) {
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
            navigate("/login");
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

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center gap-10">
        <img src={img} className="w-2/3" />
        <div className="w-1/3">
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          <form
            className="bg-white shadow-lg rounded-lg p-8 w-full"
            onSubmit={handleOTP}
          >
            <label htmlFor="otp" className="block mb-1 font-medium">
              OTP:
            </label>
            <input
              id="otp"
              type="type"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Enter your otp!"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <label htmlFor="email" className="block mb-1 font-medium">
              New Password:
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Enter your new password!"
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
            <label htmlFor="email" className="block mb-1 font-medium">
              Confirm Password:
            </label>
            <input
              id="confirm"
              type="password"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Enter your new password!"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="submit"
              className="block w-full p-2 bg-red-500 text-white rounded-md mb-4"
            >
              Submit
            </button>
            <div className="flex justify-between">
              <button
                type="button"
                className="text-blue-500"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
              <button
                type="button"
                className="text-blue-500"
                onClick={() => navigate("/signup")}
              >
                Back to Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default ResetPassword;
