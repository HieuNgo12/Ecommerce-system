import React, { useContext, useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import ModalProduct from "./modalProduct";
import { DownOutlined, EyeOutlined } from "@ant-design/icons";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const { newArrProduct, dataNewProduct } = useAdminContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [newDataProducts, setNewDataProducts] = useState([]);


  useEffect(() => {
    if (dataNewProduct && dataNewProduct.length > 0) {
      const dataChanged = dataNewProduct.map((item) => ({
        ...item,
        status: "Active",
        count: "10",
        types: [
          {
            color: "black",
            size: "XL",
            quantity: "10",
          },
          {
            color: "white",
            size: "L",
            quantity: "20",
          },
        ],
      }));
      setNewDataProducts(dataChanged);
    }
  }, [dataNewProduct]);

  console.log(dataNewProduct);
  console.log(newDataProducts);

  // useEffect(() => {
  //   if (dataNewProduct && dataNewProduct.length > 0) {
  //     setNewDataProducts(dataNewProduct);
  //   }
  // }, [dataNewProduct]);

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const updatedDataProducts = (dataUpdated) => {
    setNewDataProducts(dataUpdated);
    newArrProduct(dataUpdated);
  };

  const delProduct = async (xxx) => {
    try {
      const res = await fetch(
        `https://66b0ab0f6a693a95b539b080.mockapi.io/products/${xxx.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const updatedData = newDataProducts.filter(
          (product) => product.id !== xxx
        );
        setNewDataProducts(updatedData);
        toast("Delete successful!");
      } else {
        toast("Delete failed: " + res.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast("Error deleting product!");
    }
  };

  const filtersID = dataNewProduct.map((item) => ({
    text: item.id.toString(),
    value: item.id.toString(),
  }));

  const filtersTitle = dataNewProduct.map((item) => ({
    text: item.title.toString(),
    value: item.title.toString(),
  }));

  const filtersCategory = [
    { text: "Men's clothing", value: "men's clothing" },
    { text: "Jewelery", value: "jewelery" },
    { text: "Electronics", value: "electronics" },
    { text: "Women's clothing", value: "women's clothing" },
  ];

  const filtersStatus = [
    { text: "Active", value: "Active" },
    { text: "Block", value: "Block" },
  ];

  const truncateStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "calc(1.2em * 3)",
    lineHeight: "1.2em",
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <button onClick={() => delProduct(record)}>Delete</button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      filters: filtersID,
      fixed: "left",
      with: 50,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div style={{ width: 50 }}>{record.id}</div>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      filters: filtersTitle,
      onFilter: (value, record) => record.title.indexOf(value) === 0,
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <div style={{ width: 250 }}>{record.title}</div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: filtersCategory,
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.category}</div>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          <img
            src={record.image}
            alt={record.title}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ),
    },
    {
      title: "Types",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.color - b.color,
      render: (text, record) => (
        <div style={{ width: 80 }}>
          {record.types.map((item, index) => (
            <div key={index} className="py-1">
              {item.color}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      sorter: (a, b) => a.size - b.size,
      render: (text, record) => (
        <div style={{ width: 80 }}>
          {record.types.map((item, index) => (
            <div key={index} className="py-1">
              {item.size}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div style={{ width: 80 }}>
          {record.types.map((item, index) => (
            <div key={index} className="py-1">
              {item.quantity}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
      render: (text, record) => <div style={{ width: 80 }}>{record.count}</div>,
    },
    {
      title: "Price ( $ )",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => <div style={{ width: 80 }}>{record.price}</div>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <div style={{ width: 200 }}>
          <p style={truncateStyle}>{record.description}</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(record.description);
            }}
          >
            Read more
          </a>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filters: filtersStatus,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => (
        <div style={{ width: 50 }}>{record.status}</div>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <a href="#">
            <Space>
              Action
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={newDataProducts}
        rowKey="id"
        scroll={{ x: true, y: 950 }}
        style={{ maxWidth: 1072 }}
        sticky
      />
      {isModalOpen && (
        <ModalProduct
          openModal={setIsModalOpen}
          dataProducts={newDataProducts}
          selectedProduct={selectedProduct}
          updatedDataProducts={updatedDataProducts}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Products;
