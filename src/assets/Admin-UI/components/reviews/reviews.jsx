import React, { useContext, useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import ModalReview from "./modatalReview";
import { DownOutlined, EyeOutlined } from "@ant-design/icons";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ReviewImg from "../img/review.png"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";

const Review = () => {
  const { dataReview, dataUserName, dataProduct } = useAdminContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataChanged, setDataChanged] = useState(dataReview);
  const [selected, setSelected] = useState();

  useEffect(() => {
    const newDataChanged1 = dataReview.map((item) => {
      const loop1 = dataUserName.find((item1) => {
        return parseInt(item1.id) === item.user;
      });
      if (loop1) {
        return {
          ...item,
          status: "Active",
          username: loop1.username,
          avatar: loop1.avatar,
          // createdAt : item.createdAt.slice(0,10)
        };
      }
      return item;
    });

    const newDataChanged2 = newDataChanged1.map((item)=> {
      const loop1 = dataProduct.find((item2) => {
        return parseInt(item2.id) === item.postID
      })
      if(loop1){
        return {
          ...item,
          title: loop1.title,
          imageProduct: loop1.image,
          imageCustomer: ReviewImg
        }
      }
      return item;
    })

    setDataChanged(newDataChanged2);
  }, [dataReview]);

  // console.log(dataUserName)
  // console.log(dataChanged)
  const filtersID = dataReview.map((item) => ({
    text: item.id.toString(),
    value: item.id.toString(),
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
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div style={{ width: 50}}>{record.id}</div>,
    },
    {
      title: "User ID",
      key: "user",
      dataIndex: "user",
      filters: filtersStatus,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => <div style={{ width: 70}}>{record.user}</div>,
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
      filters: filtersStatus,
      onFilter: (value, record) => record.username.indexOf(value) === 0,
      render: (text, record) => <div style={{ width: 170}}>{record.username}</div>,
    },
    {
      title: "Like",
      dataIndex: "like",
      key: "like",
      render: (text, record) => <div style={{ width: 50}}>{record.like}</div>,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (text, record) => <div style={{ width: 250}}>{record.comment}</div>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => <div style={{ width: 200}}>{record.createdAt}</div>,
    },
    {
      title: "Image",
      dataIndex: "imageCustomer",
      key: "imageCustomer",
      render: (text, record) => (
        <div style={{width:100}}>
          <img src={record.imageCustomer} alt="" style={{width: 100, height: 100}}/>
        </div>
      ),
    },
    {
      title: "PostID",
      dataIndex: "postID",
      key: "postID",
      render: (text, record) => <div style={{ width: 50}}>{record.postID}</div>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <div style={{ width: 250}}>{record.title}</div>,
    },
    {
      title: "Image Product",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div style={{width:100}}>
          <img src={record.imageProduct} alt="" style={{width: 100, height: 100}}/>
        </div>
      ),
    },
    {
      title: "Reply",
      key: "reply",
      dataIndex: "reply",
      filters: filtersStatus,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => <div style={{ width: 50}}>{record.reply}</div>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filters: filtersStatus,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => <div style={{ width: 50}}>{record.status}</div>,
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
        <ModalReview
          setModal={setModal}
          selected={selected}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Review;
