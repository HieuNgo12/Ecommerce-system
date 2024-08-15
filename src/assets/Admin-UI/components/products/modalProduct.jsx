import React, { useState } from "react";
import { Modal, Table, Input, Select, Image } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const EditProduct = ({
  openModal,
  dataProducts,
  selectedProduct,
  updatedDataProducts,
}) => {
  const [newId, setNewId] = useState(selectedProduct.id);
  const [newTitle, setNewTitle] = useState(selectedProduct.title);
  const [newCategory, setNewCategory] = useState(selectedProduct.category);
  const [newImage, setNewImage] = useState(selectedProduct.image);
  const [newPrice, setNewPrice] = useState(selectedProduct.price);
  const [newSize, setNewSize] = useState(selectedProduct.types.size);
  const [newColor, setNewColor] = useState(selectedProduct.types.color);
  const [newQuantity, setNewQuantity] = useState(
    selectedProduct.types.quantity
  );
  const [newDescription, setNewDescription] = useState(
    selectedProduct.description
  );
  const [newStatus, setNewStatus] = useState(selectedProduct.status);

  const handleCancel = () => {
    openModal(false);
  };

  const handleOk = async () => {
    try {
      const response = await fetch(
        `https://66b0ab0f6a693a95b539b080.mockapi.io/products/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTitle,
            price: newPrice,
            description: newDescription,
            image: newImage,
            category: newCategory,
            status: newStatus,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error updating product:", error);
    }

    const updatedProducts = {
      ...selectedProduct,
      title: newTitle,
      price: newPrice,
      description: newDescription,
      image: newImage,
      category: newCategory,
      status: newStatus,
    };

    const dataUpdated = dataProducts.map((item) =>
      item.id === selectedProduct.id ? updatedProducts : item
    );
    updatedDataProducts(dataUpdated);
    toast("Update successful!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const columns1 = [
    {
      title: "Product ID",
      dataIndex: "id",
      key: "id",
      render: () => selectedProduct.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input.TextArea
            style={{ width: "150px" }}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newTitle}</div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Select
            style={{ width: "150px" }}
            value={newCategory}
            onChange={(value) => setNewCategory(value)}
          >
            <Select.Option value="men's clothing">men's clothing</Select.Option>
            <Select.Option value="jewelery">jewelery</Select.Option>
            <Select.Option value="electronics">electronics</Select.Option>
          </Select>
        ) : (
          <div style={{ width: "150px" }}>{newCategory}</div>
        );
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 200,
      render: (_, record, index) => {
        return index === 1 ? (
          <>
            <Input
              style={{ width: "200px" }}
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              className="w-48"
            />
          </>
        ) : (
          <Image
            src={newImage || selectedProduct.image}
            alt="Product"
            width={100}
          />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "150px" }}
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newPrice}</div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 250,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input.TextArea
            style={{ width: "250px" }}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        ) : (
          <div style={{ width: "250px" }}>{newDescription}</div>
        );
      },
    },
  ];

  const columns2 = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Select
            value={newStatus}
            onChange={(value) => setNewStatus(value)}
            style={{ width: "150px" }}
          >
            <Select.Option value="active">active</Select.Option>
            <Select.Option value="block">block</Select.Option>
            <Select.Option value="sold out">sold out</Select.Option>
          </Select>
        ) : (
          <div style={{ width: "150px" }}>{newStatus}</div>
        );
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "150px" }}
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newSize}</div>
        );
      },
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "150px" }}
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newColor}</div>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "150px" }}
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newQuantity}</div>
        );
      },
    },
  ];

  const data1 = [
    { key: "1" }, // Row for current information
    { key: "2" }, // Row for input fields
  ];

  const data2 = [
    { key: "1" }, // Row for current information
    { key: "2" }, // Row for input fields
  ];

  return (
    <div>
      <Modal
        title="Product Information"
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        bodyStyle={{ height: 600 }}
      >
        <Table
          columns={columns1}
          dataSource={data1}
          pagination={false}
          showHeader={true}
        />
        <Table
          columns={columns2}
          dataSource={data2}
          pagination={false}
          showHeader={true}
        />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
