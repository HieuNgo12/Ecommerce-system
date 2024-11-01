import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import Footer from "../../../Customer-UI/components/Footer";
import Navbar from "../../../Customer-UI/components/Navbar";
import img from "../img/signupandlogin.jpg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    const getToken = getCookieValue("token");
    if (getToken) {
      navigate("/profile");
    }
  }, []);

  const handleOTP = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch(
        "http://localhost:8080/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const res = await req.json();
      if (req.status === 200) {
        toast.success("Sent OTP to email successful.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            navigate("/reset-password");
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
        return;
      }
    } catch (error) {
      console.error("Error : ", error);
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
            <label htmlFor="email" className="block mb-1 font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="block w-full p-2 bg-red-500 text-white rounded-md mb-4"
            >
              Send Reset Link
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

export default ForgotPassword;
