import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import img from "../img/signupandlogin.jpg";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
  const { dataUserName } = useAdminContext();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    if (
      userName === "admin1@gmail.com" ||
      userName === "admin2@gmail.com" ||
      userName === "admin3@gmail.com" ||
      userName === "admin4@gmail.com" ||
      userName === "admin5@gmail.com" ||
      email === "admin1@gmail.com" ||
      email === "admin2@gmail.com" ||
      email === "admin3@gmail.com" ||
      email === "admin4@gmail.com" ||
      email === "admin5@gmail.com"
    ) {
      alert("không được tạo tài khoản có chứa kí tự là admin");
    } else {
      if (userName === "" || email === "" || password === "") {
        toast.warn("Vui lòng nhập đầy đủ thông tin!", {
          position: "top-center",
          autoClose:1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      } else {
        if (password !== confirm) {
          toast.warn(
            "Mật khẩu và xác nhận không trùng khớp. Vui lòng nhập lại!",
            {
              position: "top-center",
              autoClose:1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: Bounce,
            }
          );
        } else {
          const checkUserName = dataUserName.find(
            (item) => item.username === userName
          );
          if (checkUserName) {
            toast.warn("Username đã có người sử dụng", {
              position: "top-center",
              autoClose:1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: Bounce,
            });
          } else {
            const checkEmail = dataUserName.find(
              (item) => item.email === email
            );
            if (checkEmail) {
              alert("Email đã có người sử dụng");
            } else {
              if (password.length < 5) {
                toast.warn("Password phải dài hơn 5 ký tự", {
                  position: "top-center",
                  autoClose:1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  // transition: Bounce,
                });
              } else {
                try {
                  const res = await fetch(
                    "https://66b0ab0f6a693a95b539b080.mockapi.io/users/",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: userName,
                        password: password,
                        email: email,
                        license: "customer",
                      }),
                    }
                  );
                  const json = await res.json();
                  console.log(json);
                  toast.success("Đăng ký thành công", {
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
                } catch (error) {
                  console.error("Đăng ký thất bại:", error);
                  toast.error("Đăng ký thất bại", {
                    position: "top-center",
                    autoClose:1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                  });
                }
              }
            }
          }
        }
      }
    }
  };

  const onSwitchToLogIn = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src={img} className="w-2/3 h-2/3" />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="email" className="block mb-1 font-medium">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Email or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="block mb-1 font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="block w-full p-2 border rounded-md mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
          <button
            type="button"
            className="block w-full p-2 bg-white text-black border-2 rounded-md mt-2"
          >
            Sign up with Google
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
