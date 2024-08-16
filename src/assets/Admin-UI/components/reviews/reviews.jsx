import React, { useContext, useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import ModalReview from "./modatalReview";
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

const Review = () => {
  const { dataReview } = useAdminContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataChanged, setDataChanged] = useState(dataReview);
  const [selected, setSelected] = useState();

  console.log(dataReview)
  useEffect(() => {
    const newDataChanged = dataReview.map((item) => {
      return {
        ...item,
        status: "Active",
      };
    });
    setDataChanged(newDataChanged);
  }, [dataReview]);

  // const filtersID = dataReview.map((item) => ({
  //   text: item.id.toString(),
  //   value: item.id.toString(),
  // }));

  // const filtersTitle = dataReview.map((item) => ({
  //   text: item.title.toString(),
  //   value: item.title.toString(),
  // }));

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
    setIsModalOpen(xxx);
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Item key="1">
        <button>Detail</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <button>Delete</button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // filters: filtersID,
      width: 50,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
    },
    // {
    //   title: "Like",
    //   dataIndex: "like",
    //   key: "like",
    //   filters: filtersTitle,
    //   onFilter: (value, record) => record.title.indexOf(value) === 0,
    //   sorter: (a, b) => a.title.localeCompare(b.title),
    // },
    // {
    //   title: "PostID",
    //   dataIndex: "postID",
    //   key: "postID",
    //   render: (rating) => (
    //     <div>
    //       <div>Rate: {rating.rate}</div>
    //     </div>
    //   ),
    // },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filters: filtersStatus,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
          dataUserName={dataChanged}
          updateData={updateData}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Review;
