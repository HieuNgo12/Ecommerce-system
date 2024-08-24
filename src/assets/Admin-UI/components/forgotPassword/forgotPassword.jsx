import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Customer-UI/components/Footer";
import Navbar from "../../../Customer-UI/components/Navbar";
import img from "../img/signupandlogin.jpg";

function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center gap-10">
        <img src={img} className="w-2/3 mb-8" />
        <div className="w-1/3">
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          <form className="bg-white shadow-lg rounded-lg p-8 w-full">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Enter your email address"
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
    </div>
  );
}

export default ForgotPassword;
