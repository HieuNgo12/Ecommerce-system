import React, { useState } from "react";
import { Modal, Input, Select, Form } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useAdminContext } from "../../AdminContext";

const EditProduct = ({ openModal, selectedProduct, callApi }) => {
  // const { callApi } = useAdminContext();
  const [form] = Form.useForm(); // Sử dụng Form.useForm() để quản lý form
  const [newImage, setNewImage] = useState(selectedProduct.image);
  const [newUploadImage, setNewUploadImage] = useState(null);

  const handleCancel = () => {
    openModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result);
        setNewUploadImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Lấy tất cả giá trị từ form

      const formData = new FormData();
      if (newUploadImage) {
        formData.append("file", newUploadImage); // Thêm tệp vào FormData
      }
      formData.append("productId", selectedProduct._id);

      const req1 = await fetch(
        "http://localhost:8080/api/v1/products/single-upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const res1 = await req1.json();
      const imageUrl = res1.secure_url || newImage;

      const req2 = await fetch(
        `http://localhost:8080/api/v1/products/update-product/${selectedProduct._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            image: imageUrl, // Sử dụng URL hình ảnh mới hoặc hình cũ
          }),
        }
      );
      const res2 = await req2.json();
      console.log(res2);
      callApi();
      toast.success("Updated successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => openModal(false),
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.", {
        autoClose: 3000,
      });
    }
  };

  const colors = [
    "yellow-500",
    "orange-500",
    "white",
    "blue-500",
    "black",
    "red-500",
    "gray-500",
    "sky-500",
    "rose-500",
    "cyan-500",
    "violet-500",
  ];

  return (
    <Modal
      title="Product Information"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }} // Kiểm soát chiều cao và cuộn dọc
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: selectedProduct.title,
          category: selectedProduct.category,
          price: selectedProduct.price,
          color: selectedProduct.color,
          brand: selectedProduct.brand,
          quantity: selectedProduct.quantity,
          description: selectedProduct.description,
          status: selectedProduct.status,
          discount: selectedProduct.discount,
          slug: selectedProduct.slug,
          sku: selectedProduct.sku,
        }}
      >
        <Form.Item label="Product ID">
          <Input value={selectedProduct._id} disabled />
        </Form.Item>

        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Sku" name="sku" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Category" name="category" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="men's clothing">men's clothing</Select.Option>
            <Select.Option value="women's clothing">
              women's clothing
            </Select.Option>
            <Select.Option value="electronics">electronics</Select.Option>
            <Select.Option value="jewelery">jewelery</Select.Option>
            <Select.Option value="toy">Toy</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item label="Discount" name="discount">
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item label="Color" name="color">
          <Select>
            {colors.map((item, index) => (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="out_of_stock">Out of stock</Select.Option>
            <Select.Option value="discontinued">Discontinued</Select.Option>
            <Select.Option value="pre_order">Pre-order</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Image">
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {newImage && <img src={newImage} alt="Product" width={100} />}
        </Form.Item>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

export default EditProduct;
