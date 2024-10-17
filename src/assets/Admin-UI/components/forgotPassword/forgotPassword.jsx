import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Footer from "../../../Customer-UI/components/Footer";
import Navbar from "../../../Customer-UI/components/Navbar";
import img from "../img/signupandlogin.jpg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleOTP = async (e) => {
    e.preventDefault();
    try {
      const callApi = await fetch(
        "http://localhost:8080/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if(callApi.status === 200){
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
      }

      const res = await callApi.json();

      console.log(res)
      if (
        res.message === "Email is required!" &&
        res.success === false
      ) {
        toast.warn("Email is required.", {
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

      if (
        res.message === "Invalid Email" &&
        res.success === false
      ) {
        toast.warn("Invalid email.", {
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

      if (
        res.message === "Email has not been used!" &&
        res.success === false
      ) {
        toast.warn("Email has not been used!", {
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

      if (
        res.message === "Email has not been verified!" &&
        res.success === false
      ) {
        toast.warn("Email has not been verified!", {
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

      if (
        res.message === "Error create Otp." &&
        res.success === false
      ) {
        toast.warn("Error create Otp.", {
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

      if (
        res.message === "error" &&
        res.success === false
      ) {
        toast.warn("Something went wrong, please try again.", {
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
