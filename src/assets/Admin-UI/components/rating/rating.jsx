import React, { useContext, useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import ModalRating from "./modalRating";
import { DownOutlined, EyeOutlined } from "@ant-design/icons";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";

const Rating = () => {
  const { dataNewProduct } = useAdminContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataChanged, setDataChanged] = useState(dataNewProduct);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (dataNewProduct && dataNewProduct.length > 0) {
      const newDataChanged = dataNewProduct.map((item) => {
        return {
          ...item,
          status: "Active",
          comment: "10",
        };
      });
      setDataChanged(newDataChanged);
    }
  }, [dataNewProduct]);

 

  const filtersID = dataNewProduct.map((item) => ({
    text: item.id.toString(),
    value: item.id.toString(),
  }));

  const filtersTitle = dataNewProduct.map((item) => ({
    text: item.title.toString(),
    value: item.title.toString(),
  }));

  const filtersStatus = [
    { text: "active", value: "active" },
    { text: "block", value: "block" },
  ];

  const openModal = (xxx) => {
    setIsModalOpen(true);
    setSelected(xxx);
  };

  const setModal = (xxx) => {
    setIsModalOpen(xxx);
  };

  const updateData = (xxx) => {
    setDataChanged(xxx);
  };

  console.log(dataChanged)

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <button>Delete</button>
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
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <div style={{ width: 70 }}>
          <div>{rating.rate}</div>
        </div>
      ),
    },
    {
      title: "Rating Count",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <div style={{ width: 90 }}>
          <div>{rating.count}</div>
        </div>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: 100,
      render: (text, record) => (
        <div style={{ width: 70 }}>
          <div>{record.comment}</div>
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
        dataSource={dataChanged}
        rowKey="id"
        scroll={{ x: true, y: 950 }}
        style={{ maxWidth: 1072 }}
        sticky
      />
      {isModalOpen && (
        <ModalRating
          setModal={setModal}
          selected={selected}
          dataNewProduct={dataChanged}
          updateData={updateData}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Rating;
