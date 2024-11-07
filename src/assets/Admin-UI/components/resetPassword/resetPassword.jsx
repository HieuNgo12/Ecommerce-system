import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Customer-UI/components/Footer";
import Navbar from "../../../Customer-UI/components/Navbar";
import img from "../img/signupandlogin.jpg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Button, Checkbox, message } from "antd";
import { red } from "@mui/material/colors";

function ResetPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
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

   
  const handleOTP = async (values) => {
    try {
      console.log(values)
      const req = await fetch(
        "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: values.otp,
            password: values.password,
            confirm: values.confirm,
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
      <img src={img} className="w-2/3" alt="Forgot Password" />
      <div className="w-1/3">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <Form
          form={form}
          className="bg-white shadow-lg rounded-lg p-8 w-full"
          onFinish={handleOTP}
          layout="vertical"
        >
          <Form.Item
            name="otp"
            label="OTP"
            rules={[{ required: true, message: "Please enter the OTP!" }]}
          >
            <Input.OTP
            placeholder="Enter your OTP"
            // onChange={(e) => setOtp(e.target.value)}
          />
          </Form.Item>

          <Form.Item
            name="password"
            label="New Password"
            rules={[{ required: true, message: "Please enter a new password!" }]}
          >
            <Input.Password
              placeholder="Enter your new password"
              visibilityToggle={{
                visible: showPassword,
                onVisibleChange: setShowPassword,
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your new password" />
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            >
              Show Password
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" style={{background: "red"}}>
              Submit
            </Button>
          </Form.Item>

          <div className="flex justify-between">
            <Button type="link" onClick={() => navigate("/login")}>
              Back to Login
            </Button>
            <Button type="link" onClick={() => navigate("/signup")}>
              Back to Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
    <Footer />
    <ToastContainer />
  </div>
  );
}

export default ResetPassword;
