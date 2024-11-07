import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography , Select} from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";

function PaymentMethod({ userData, refreshToken, callApi }) {
  const [form] = Form.useForm();
  const [token, setToken] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [otpForPhone, setOtpForPhone] = useState("");

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
    setPhone(userData.phone);
    setEmail(userData.email);
    setUserName(userData.username);
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

  const onFinish = (values) => {
    console.log("Form values: ", values);
  };

  const sentOtpToPhone = async () => {
    try {
      const req1 = await fetch(
        "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/users/send-verification-phone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone: phone,
          }),
        }
      );

      if (req1.status === 403) {
        const req2 = await refreshToken(token);
        if (!req2) throw new Error("Please log in first!");
        setToken(req2);
        setCookie("token", req2, 7);
        const req3 = await fetch(
          "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/users/send-verification-phone",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${req2}`,
            },
            body: JSON.stringify({
              phone: phone,
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
  };

  const verifyPhone = async () => {
    try {
      const req1 = await fetch(
        "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/users/verify-phone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            otp: otpForPhone,
          }),
        }
      );
      if (req1.status === 403) {
        const req2 = await refreshToken(token);
        if (!req2) throw new Error("Please log in first!");
        setToken(req2);
        setCookie("token", req2, 7);
        const req3 = await fetch(
          "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/users/verify-phone",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              otp: otpForPhone,
            }),
          }
        );
        const res3 = await req3.json();
        if (req3.status === 200) {
          callApi();
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
        callApi();
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
        Payment Method
      </Typography.Title>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          // paymentMethod: paymentMethod || "", // Đặt giá trị mặc định cho phương thức thanh toán
        }}
      >
        {/* Payment Method Section */}
        <Form.Item
          name="paymentMethod"
          label="Select Payment Method"
          rules={[
            {
              required: true,
              message: "Please select a payment method",
            },
          ]}
        >
          <Select
            placeholder="Select a payment method"
            // onChange={(value) => setPaymentMethod(value)}
            // value={paymentMethod}
          >
            <Select.Option value="Credit Card">Credit Card</Select.Option>
            <Select.Option value="PayPal">PayPal</Select.Option>
            <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
            <Select.Option value="Cash">Cash</Select.Option>
          </Select>
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Button type="primary" style={{ width: "45%" }} onClick={updatePaymentMethod}>
            Update Payment Method
          </Button> */}
          <Button type="default" style={{ width: "45%" }} onClick={() => form.resetFields()}>
            Cancel
          </Button>
        </div>
      </Form>

      <ToastContainer />
    </div>
  );
}

export default PaymentMethod;
