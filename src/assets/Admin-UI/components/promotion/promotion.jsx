import React, { useContext, useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import ModalPromotion from "./modalPromotion";
import { DownOutlined, EyeOutlined } from "@ant-design/icons";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import dataPromotion from "../data/dataPromotion";

const Promotion = () => {
  const { dataNewProduct } = useAdminContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtersID = dataPromotion.map((item) => ({
    text: item.id.toString(),
    value: item.id.toString(),
  }));

  const filtersTitle = dataPromotion.map((item) => ({
    text: item.title.toString(),
    value: item.title.toString(),
  }));

  const filtersStatus = [
    { text: "active", value: "active" },
    { text: "block", value: "block" },
  ];

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
      filters: filtersID,
      width: 50,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filters: filtersTitle,
      onFilter: (value, record) => record.title.indexOf(value) === 0,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: 150,
    },
    {
      title: "Request",
      dataIndex: "request",
      key: "request",
      width: 150,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 50,
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
      <Table columns={columns} dataSource={dataPromotion} rowKey="id" />
      {isModalOpen && <ModalPromotion openModal={setIsModalOpen} />}
    </div>
  );
};

export default Promotion;
