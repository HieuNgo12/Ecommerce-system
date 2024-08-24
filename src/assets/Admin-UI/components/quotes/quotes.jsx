import React, { useContext, useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import { DownOutlined, EyeOutlined } from "@ant-design/icons";
import ModalQuotes from "./modalQuotes";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import { ToastContainer, toast } from "react-toastify";

const Quotes = () => {
  const { dataQuotes } = useAdminContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const dataChanged = dataQuotes.map((item) => ({
    ...item,
    status: "Active",
    reply: "",
    dateCreate: "YYYY-MM-DD",
    dateReply: "YYYY-MM-DD",
  }));

  const [newDataQuotes, setNewDataQuotes] = useState(dataChanged);

  const openModal = (record) => {
    setIsModalOpen(true);
    setSelected(record);
  };

  const test = (xxx) => {
    setNewDataQuotes(xxx);
  };

  const filtersID = dataChanged.map((item) => ({
    text: item.id.toString(),
    value: item.id.toString(),
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
      width: 100,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div style={{ width: 50 }}>{record.id}</div>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      // width: 200,
      sorter: (a, b) => a.author.localeCompare(b.author),
      // render: (text, record) => (
      //   <div style={{ width: 150 }}>{record.author}</div>
      // ),
    },
    {
      title: "Quote",
      dataIndex: "quote",
      key: "quote",
      // width:300,
      // render: (text, record) => (
      //   <div style={{ width: 300, }}>
      //     <p>{record.quote}</p>
      //   </div>
      // ),
    },
    {
      title: "Response",
      dataIndex: "reply",
      key: "reply",
      // width: 250,
      // render: (text, record) => (
      //   <div style={{ width: 250, height: 100 }}>
      //     <p>{record.reply}</p>
      //   </div>
      // ),
    },
    {
      title: "Date Created",
      dataIndex: "dateCreate",
      key: "dateCreate",
      // width: 150,
      // render: (text, record) => (
      //   <div style={{ width: 100 }}>{record.dateCreate}</div>
      // ),
    },
    {
      title: "Date Response",
      dataIndex: "reply",
      key: "reply",
      // width: 150,
      // render: (text, record) => (
      //   <div style={{ width: 100 }}>{record.dateReply}</div>
      // ),
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filters: filtersStatus,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      // render: (text, record) => (
      //   <div style={{ width: 50 }}>{record.status}</div>
      // ),
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
    <div className="overflow-hidden">
      <Table
        columns={columns}
        dataSource={newDataQuotes}
        rowKey="id"
        scroll={{ x: 1200, y: 950 }}
        // style={{ maxWidth: 1080 }}
        sticky
      />
      {isModalOpen && (
        <ModalQuotes
          openModal={setIsModalOpen}
          selected={selected}
          dataQuotes={newDataQuotes}
          updatedQuotes={test}
        />
      )}
    </div>
  );
};

export default Quotes;
