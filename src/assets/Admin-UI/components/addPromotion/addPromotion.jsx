import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  InputNumber,
  Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddPromotion = () => {
  const [form] = Form.useForm();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [promotionImage, setPromotionImage] = useState(null);
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
    if (getToken) {
      setToken(getToken);
    } else {
      toast.error("Please log in again!", {
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
  }, []);

  useEffect(() => {
    if (token) {
      callApi();
    }
  }, [token]);

  const callApi = async () => {
    try {
      const req1 = await fetch("https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/products/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res1 = await req1.json();
      setProducts(res1.data);
    } catch (error) {
      console.log("error", error);
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

  const createNewPromotion = async (values) => {
    const toastId = toast.loading("Creating...");
    try {
      console.log(values);
      const formData = new FormData();
      formData.append("file", promotionImage); // Thêm tệp hình ảnh vào FormData
      formData.append("code", values.code);
      formData.append("description", values.description);
      formData.append("discountType", values.discountType);
      formData.append("discountValue", values.discountValue);
      formData.append("minimumOrderValue", values.minimumOrderValue || 0);
      formData.append("maxDiscount", values.maxDiscount || 0);
      formData.append("startDate", values.startDate.toISOString());
      formData.append("endDate", values.endDate.toISOString());
      formData.append("usageLimit", values.usageLimit || null);
      formData.append("status", values.status || "active");

      const req1 = await fetch(
        "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/promotion/add-promotion",
        {
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      if (req1.status === 403) {
        const req2 = await fetch(
          "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/auth/refresh-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (!req2) throw new Error("Please log in again!");
        const res2 = await req2.json();
        const newToken = res2.accessToken;
        setToken(newToken);
        setCookie("token", newToken, 7);
        const req3 = await fetch(
          "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/promotion/add-promotion",
          {
            method: "POST",
            headers: { authorization: `Bearer ${newToken}` },
            body: formData,
          }
        );
        if (req3.status === 200) {
          toast.update(toastId, {
            render: "Create Account successful!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            onClose: () => navigate("/admin/promotion"),
          });
        } else {
          const res3 = await res3.json();
          toast.update(toastId, {
            render: res3.message,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
      if (req1.status === 200) {
        toast.update(toastId, {
          render: "Create Account successful!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          onClose: () => navigate("/admin/promotion"),
        });
      } else {
        const res1 = await req1.json();
        toast.update(toastId, {
          render: res1.message,
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.update(toastId, {
        render: "Something went wrong, please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleImageChange = (file) => {
    setPromotionImage(file);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Promotion</h1>
      <Form layout="vertical" onFinish={createNewPromotion}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Promotion Code"
              name="code"
              rules={[
                { required: true, message: "Please enter the promotion code!" },
              ]}
            >
              <Input placeholder="PROMO2024" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Description" name="description">
              <Input.TextArea
                placeholder="Enter promotion description"
                rows={2}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Discount Type"
              name="discountType"
              rules={[
                { required: true, message: "Please select a discount type!" },
              ]}
            >
              <Select value={discountType} onChange={setDiscountType}>
                <Option value="percentage">Percentage</Option>
                <Option value="fixed">Fixed Amount</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Discount Value"
              name="discountValue"
              rules={[
                { required: true, message: "Please enter the discount value!" },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Enter discount amount or percentage"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Minimum Order Value" name="minimumOrderValue">
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Minimum order to apply promotion"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Maximum Discount" name="maxDiscount">
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Maximum discount amount"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[
                { required: true, message: "Please select a start date!" },
              ]}
            >
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="End Date"
              name="endDate"
              rules={[
                { required: true, message: "Please select an end date!" },
              ]}
            >
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Applicable Products" name="applicableProducts">
              <Select
                mode="multiple"
                placeholder="Select products"
                onChange={setSelectedProducts}
                style={{ width: "100%" }}
              >
                {/* Replace the options below with dynamic product data */}
                <Option value="all">All</Option>
                {products.map((item, index) => {
                  return (
                    <Option key={index} value={item.title}>
                      {item.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Usage Limit" name="usageLimit">
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                placeholder="Total usage limit for promotion"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Status" name="status" initialValue="active">
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="expired">Expired</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Promotion Image" name="promotionImage">
              <Upload
                beforeUpload={() => false}
                onChange={(info) => handleImageChange(info.file)}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>
                  Upload Promotion Image
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Button type="primary" htmlType="submit" block>
              Save Promotion
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddPromotion;
