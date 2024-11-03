import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Button, Radio , Typography} from "antd";

function ChangePassword({ userData, refreshToken, callApi }) {
  const [form] = Form.useForm();
  const [token, setToken] = useState("");
  const [method, setMethod] = useState("");
  const [otp, setOtp] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  useEffect(() => {
    if (!userData || !userData._id) {
      return;
    }
  }, [userData, form]);

  useEffect(() => {
    const getToken = getCookieValue("token");
    if (!getToken) {
      toast.warn("Please log in to get information!", {
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
    setToken(getToken);
  }, []);

  const onFinish = async (values) => {
    try {
      const req1 = await fetch(
        "http://localhost:8080/api/v1/users/change-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            values,
          }),
        }
      );
      if (req1.status === 403) {
        const req2 = await refreshToken(token);
        if (!req2) throw new Error("Please log in first!");
        setCookie("token", req2, 7);
        setToken(req2);
        const req3 = await fetch(
          "http://localhost:8080/api/v1/users/change-password",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              values,
            }),
          }
        );
        const res3 = await req1.json();
        if (req3.status === 200) {
          toast.success(res3.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.warn(res3.message, {
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
      const res1 = await req1.json();
      if (req1.status === 200) {
        toast.success(res1.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.warn(res1.message, {
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
      console.log("error", error);
    }
  };

  const sentOtp = async () => {
    if (method === "") {
      toast.warn("Please select a method!", {
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
      try {
        const req1 = await fetch(
          "http://localhost:8080/api/v1/users/send-otp-change-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              method: method,
            }),
          }
        );
        if (req1.status === 403) {
          const req2 = await refreshToken(token);
          if (!req2) {
            toast.warn("Please log in!", {
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
          setCookie(req2);
          setToken(req2);
          const req3 = await fetch(
            "http://localhost:8080/api/v1/users/send-otp-change-password",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${req2}`,
              },
              body: JSON.stringify({
                method: method,
              }),
            }
          );
          const res3 = await req3.json();
          if (req3.status === 200) {
            toast.success(res3.message, {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
        if (req1.status === 200) {
          const res1 = await req1.json();
          toast.success(res1.message, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        padding: "30px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography.Title
        level={2}
        style={{ color: "#007BFF", textAlign: "center", marginBottom: "30px" }}
      >
        My Password
      </Typography.Title>

      <Form form={form} onFinish={onFinish} layout="vertical">
        {/* UserName Section */}

        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            {
              required: true,
              type: "string",
              message: "Current Password is required",
            },
          ]}
        >
          <Input.Password placeholder="Current Password" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              type: "string",
              message: "New Password is required",
            },
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            {
              required: true,
              type: "string",
              message: "Confirm Password is required",
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item label="Select OTP Method">
          <Radio.Group
            onChange={(e) => setMethod(e.target.value)}
            value={method}
          >
            <Radio value="phone">Phone</Radio>
            <Radio value="email">Email</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="otp"
          label="OTP"
          rules={[{ required: true, message: "OTP is required" }]}
        >
          <Input.OTP
            placeholder="OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Item>

        {/* Buttons for OTP Phone */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="primary" style={{ width: "45%" }} onClick={sentOtp}>
            Send OTP
          </Button>
          <Button
            type="primary"
            style={{ width: "45%", backgroundColor: "#4CAF50" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ChangePassword;
