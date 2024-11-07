import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  InputNumber,
  message,
  Col,
  Row,
} from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState(null);
  const [newImage, setNewImage] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const colors = [
    "yellow-500",
    "orange-500",
    "white",
    "blue-500",
    "black",
    "red-500",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const getToken = getCookieValue("token");
    if (!getToken) {
      toast.error("Please log in again.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else {
      setToken(getToken);
    }
  }, []);

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

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleImageChange = ({ file }) => {
    setNewImage(file);
  };

  const callRefreshToken = async (xxx) => {
    try {
      const req = await fetch(
        "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/auth/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${xxx}`,
          },
        }
      );
      const res = await req.json();
      const newToken = res.accessToken;
      console.log(newToken);
      return newToken;
    } catch (err) {
      console.log("error", err);
      return null;
    }
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Creating...");
    try {
      const formData = new FormData();
      formData.append("file", newImage ? newImage : "");
      formData.append("category", values.category);
      formData.append("title", values.title);
      formData.append("status", values.status ? values.status : "available");
      formData.append("price", values.price ? values.price : 0);
      formData.append("quantity", values.quantity ? values.quantity : 0);
      formData.append("slug", values.slug);
      formData.append("sku", values.sku);
      formData.append("description", values.description);
      formData.append("size", values.size);
      formData.append("tags", values.tags);
      formData.append("color", selectedColor);

      const req1 = await fetch(
        "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/products/add-product",
        {
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      if (req1.status === 403) {
        const newToken = await callRefreshToken(token);
        console.log(newToken);
        if (!newToken) throw new Error("Log in first!");
        setToken(newToken);
        setCookie("token", newToken, 7);
        const req2 = await fetch(
          "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/products/add-product",
          {
            method: "POST",
            headers: { authorization: `Bearer ${newToken}` },
            body: formData,
          }
        );
        if (req2.status === 200) {
          toast.update(toastId, {
            render: "Updated successful!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            onClose: () => navigate("/admin/products"),
          });
        }
        if (req2.status === 400) {
          const res2 = await req2.json();
          toast.update(toastId, {
            render: res2,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
      if (req1.status === 200) {
        toast.update(toastId, {
          render: "Updated successful!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          onClose: () => navigate("/admin/products"),
        });
      }
      if (req1.status === 400) {
        const res2 = await req1.json();
        toast.update(toastId, {
          render: res2,
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select placeholder="Select a category">
                <Option value="men's clothing">Men's Clothing</Option>
                <Option value="women's clothing">Women's Clothing</Option>
                <Option value="electronics">Electronics</Option>
                <Option value="jewelery">Jewelery</Option>
                <Option value="toy">Toy</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter a title!" }]}
            >
              <Input placeholder="Product title" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Status" name="status" initialValue="available">
              <Select>
                <Option value="available">Available</Option>
                <Option value="out_of_stock">Out of Stock</Option>
                <Option value="discontinued">Discontinued</Option>
                <Option value="pre_order">Pre Order</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter a price!" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Please enter a slug!" }]}
            >
              <Input placeholder="Product slug" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Brand" name="brand">
              <Input placeholder="Brand" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="SKU" name="sku">
              <Input placeholder="SKU" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Quantity" name="quantity">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Color">
              <div className="flex">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 mr-2 bg-${color} rounded-full cursor-pointer ${
                      selectedColor === color ? "border-2 border-black" : ""
                    }`}
                    onClick={() => handleColorClick(color)}
                  ></div>
                ))}
              </div>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Size" name="size">
              <Select placeholder="Select a size">
                {sizes.map((size) => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tags" name="tags">
              <Input placeholder="Tags" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Images" name="images" valuePropName="file">
              <Upload beforeUpload={() => false} onChange={handleImageChange}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter a description!" },
              ]}
            >
              <Input.TextArea rows={3} placeholder="Product description" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save Product
          </Button>
        </Form.Item>
      </Form>

      <ToastContainer />
    </div>
  );
};

export default AddProduct;
