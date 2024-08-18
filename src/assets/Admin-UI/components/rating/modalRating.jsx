import React, { useState } from "react";
import { Modal, Table, Input, Select, Image } from "antd";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ModalCustomer = ({ dataNewProduct, setModal, selected, updateData }) => {
  const [newStatus, setNewStatus] = useState(selected.status);
  const [newData, setNewData] = useState();

  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = () => {
    const changeStatus = dataNewProduct.map((item) => {
      if (item.id === selected.id) {
        return {
          ...item,
          status: newStatus,
        };
      } else {
        return item;
      }
    });
    setNewData(changeStatus);
    updateData(changeStatus);
    toast("Update successful!");
  };

  const columns1 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: () => selected.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: () => selected.title,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: () => (
        <img src={selected.image} style={{ width: "100px", height: "100px" }} />
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: () => (
        <div style={{ width: 70 }}>
          <div>{selected.rating.rate}</div>
        </div>
      ),
    },
    {
      title: "Rating Count",
      dataIndex: "rating",
      key: "rating",
      render: () => (
        <div style={{ width: 90 }}>
          <div>{selected.rating.count}</div>
        </div>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: 100,
      render: () => (
        <div style={{ width: 70 }}>
          <div>{selected.comment}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (_, record, index) => {
        return index === 1 ? (
          <Select
            style={{ width: "150px" }}
            value={newStatus}
            onChange={(value) => setNewStatus(value)}
          >
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Block">Block</Select.Option>
            <Select.Option value="Block Comment">Block Comment</Select.Option>
            <Select.Option value="Block Rating">Block Rating</Select.Option>
          </Select>
        ) : (
          newStatus
        );
      },
    },
  ];

  const data1 = [
    { key: "1" }, // Row for current information
    { key: "2" }, // Row for input fields
  ];

  return (
    <div>
      <Modal
        title="Customer Information"
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        bodyStyle={{ height: 350 }}
      >
        <Table
          columns={columns1}
          dataSource={data1}
          pagination={false}
          showHeader={true}
        />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ModalCustomer;
