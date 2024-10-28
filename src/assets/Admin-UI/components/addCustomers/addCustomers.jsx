import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import moment from "moment";

const { Option } = Select;

const AddCustomers = () => {
  const [token, setToken] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

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
    const getToken = getCookieValue("token");
    if (!getToken) {
      toast.warn("Please log in first!", {
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
      setToken(getToken);
    }
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const currentDate = new Date();
  const onFinish = async (values) => {
    const toastId = toast.loading("Creating...");
    try {
      const formData = new FormData();
      formData.append("file", image); // Thêm tệp vào FormData
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("confirm", values.confirm);
      formData.append("phone", values.phone ? values.phone : "");
      formData.append("firstName", values.firstName ? values.firstName : "");
      formData.append("lastName", values.lastName ? values.lastName : "");
      formData.append("zipcode", values.zipcode ? values.zipcode : "");
      formData.append("idCard", values.idCard ? values.idCard : "");
      formData.append("city", values.city);
      formData.append("district", values.district);
      formData.append("ward", values.ward);
      formData.append("number", values.number);
      formData.append("gender", values.gender ? values.gender : true);
      formData.append("dateOfBirth", dateOfBirth ? dateOfBirth : currentDate);

      const req1 = await fetch("http://localhost:8080/api/v1/admin/signup", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (req1.status === 403) {
        const req2 = await fetch(
          "http://localhost:8080/api/v1/auth/refresh-token",
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const res2 = await req2.json();
        const newToken = res2.accessToken;
        setCookie("token", newToken, 7);
        setToken(newToken);
        const req3 = await fetch("http://localhost:8080/api/v1/admin/signup", {
          method: "POST",
          headers: {
            authorization: `Bearer ${newToken}`,
          },
          body: formData,
        });
        if (req3.status === 201) {
          toast.update(toastId, {
            render: "Create Account successful!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            onClose: () => navigate("/admin/customers"),
          });
        }
        if (req3.status === 400) {
          const res3 = await req3.json();
          toast.update(toastId, {
            render: res3.message,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
      if (req1.status === 400) {
        const res3 = await req1.json();
        toast.update(toastId, {
          render: res3.message,
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
      }
      if (req1.status === 201) {
        toast.update(toastId, {
          render: "Create Account successful!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          onClose: () => navigate("/admin/customers"),
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Something went wrong, please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Customers</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Confirm Password"
              name="confirm"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Gender" name="gender">
              <Select>
                <Option value={true}>Man</Option>
                <Option value={false}>Woman</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date Of Birth" name="dateOfBirth">
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date, dateString) => setDateOfBirth(dateString)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Phone" name="phone">
              <PhoneInput inputStyle={{ width: "100%" }} country={"vn"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Zipcode" name="zipcode">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="First Name" name="firstname">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last Name" name="lastname">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Address Number" name="number">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Address Ward" name="ward">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Address District" name="district">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Address City" name="city">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="ID Card" name="idCard">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Images"
              name="newImage"
              valuePropName="file"
              onChange={handleUpload}
            >
              <Input type="file" accept="image/*" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Account
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddCustomers;
