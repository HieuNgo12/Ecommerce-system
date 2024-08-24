import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAdminContext } from "../../AdminContext";
import dataPromotionJSX from "../data/dataPromotion";
import ModalPromotion from "./modalPromotion";

const Promotion = () => {
  const { dataPromotion } = useAdminContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({});

  const arrPromotion = [...dataPromotionJSX, dataPromotion];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTimeRemaining = {};

      arrPromotion.forEach((record) => {
        if (record.endDate && record.endTime) {
          // Tạo chuỗi ngày và giờ kết thúc
          const endDateTimeStr = `${record.endDate}T${record.endTime}:00Z`;
          console.log(endDateTimeStr)
          const endTime = new Date(endDateTimeStr).getTime(); // Lấy thời gian kết thúc dưới dạng mili giây
          console.log(endTime)

          const now = new Date().getTime(); // Lấy thời gian hiện tại dưới dạng mili giây

          const timeLeft = Math.max(0, endTime - now); // Tính thời gian còn lại

          // Tính số giây, phút, giờ, và ngày
          const seconds = Math.floor((timeLeft / 1000) % 60);
          const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
          const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

          updatedTimeRemaining[record.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          updatedTimeRemaining[record.id] = 'N/A';
        }
      });

      setTimeRemaining(updatedTimeRemaining);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [arrPromotion]);

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => setIsModalOpen(true)}>Edit</button>
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
      fixed: "left",
      width: 100,
      render: (text) => <div style={{ width: 50 }}>{text}</div>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <div style={{ width: 200 }}>{text}</div>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <div style={{ width: 100 }}>{text}</div>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <div style={{ width: 100 }}>{text}</div>,
    },
    {
      title: "Sales",
      dataIndex: "promotionalPrice",
      key: "Sales",
      // width: 150,
      render: (text) => <div style={{ width: 100 }}>{text}</div>,
    },
    {
      title: "StartDate",
      dataIndex: "startDate",
      key: "startDate",
      // width: 150,
      render: (text) => <div style={{ width: 100 }}>{text}</div>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      // width: 150,
      render: (text) => <div style={{ width: 100 }}>{text}</div>,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      // width: 150,
      render: (text) => <div style={{ width: 100 }}>{text}</div>,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => <div style={{ width: 100 }}>{text}</div>,
    },
    {
      title: "Time",
      dataIndex: "id",
      key: "Time",
      render: (id) => <div style={{ width: 100 }}>{timeRemaining[id]}</div>,
    },
    {
      title: "Request",
      dataIndex: "request",
      key: "request",
      // width: 150,
      render: (text) => <div style={{ width: 100 }}>{text}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => <div style={{ width: 50 }}>{text}</div>,
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
        dataSource={arrPromotion}
        scroll={{ x: true, y: 950 }}
        // style={{ maxWidth: 1080 }}
        rowKey="id"
        sticky
      />
      {isModalOpen && <ModalPromotion openModal={setIsModalOpen} />}
    </div>
  );
};

export default Promotion;
