import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import img from "../img/signupandlogin.jpg";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../../Customer-UI/components/Footer";
import Navbar from "../../../Customer-UI/components/Navbar";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// import adminData from "../data/userAdmin.json";
// import validator from "validator";

function SignUp() {
  // const { dataUserName } = useAdminContext();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

  const signUp = async (e) => {
    try {
      e.preventDefault();

      const req = await fetch("https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          confirm: confirm,
        }),
      });

      const res = await req.json();
      if (req.status === 201) {
        toast.success("Signup is successful", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => navigate("/login"),
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

  const SignUpByGG = async (credentialResponse) => {
    try {
      const req = await fetch(
        "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/auth/signup-by-gg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentialResponse.credential}`,
          },
        }
      );
      if (req.status === 201) {
        toast.success("Signup is successful", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => navigate("/login"),
        });
      }
      if (req.status === 400) {
        const res = await req.json();
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

  const onSwitchToLogIn = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex justify-center items-center gap-10">
        <img src={img} className="w-2/3" />
        <div className="bg-white shadow-lg rounded-lg p-8 w-1/3">
          <form onSubmit={signUp} className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Create an account</h2>
              <div className="border-b-2 border-gray-300"></div>
            </div>
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                UserName:
              </label>
              <input
                type="text"
                id="name"
                className="block w-full p-2 border rounded-md mb-4"
                placeholder="UserName"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label htmlFor="email" className="block mb-1 font-medium">
                Email:
              </label>
              <input
                type="text"
                id="email"
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
              <label htmlFor="confirm" className="block mb-1 font-medium">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirm"
                className="block w-full p-2 border rounded-md mb-4"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="block w-full p-2 bg-red-500 text-white rounded-md"
            >
              Create Account
            </button>

            <GoogleLogin
              onSuccess={(credentialResponse) => {
                SignUpByGG(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />

            <button
              type="button"
              className="text-blue-500"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-500"
                onClick={onSwitchToLogIn}
              >
                Log In
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
    <SignUp />
  </AdminProvider>
);

export default App;
