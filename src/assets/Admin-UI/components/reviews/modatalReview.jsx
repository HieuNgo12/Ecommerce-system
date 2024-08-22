import React, { useState } from "react";
import { Modal, Table, Input, Select, Image } from "antd";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ModalCustomer = ({ setModal, selected }) => {
  const { callApi } = useAdminContext();
  const [newStatus, setNewStatus] = useState(selected.status);
  const [newReply, setNewReply] = useState(selected.reply);

  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = async () => {
    try {
      const res = await fetch(
        `https://66bce56424da2de7ff6c2c3e.mockapi.io/reviews/${selected.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reply: newReply,
          }),
        }
      );
      const json = await res.json();
      console.log(json);
      callApi();
      toast.success("Updated successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => setModal(false),
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.", {
        autoClose: 3000,
      });
    }
  };

  const columns1 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: () => <div style={{ width: 50 }}>{selected.id}</div>,
    },
    {
      title: "User ID",
      dataIndex: "user",
      key: "user",
      render: () => <div style={{ width: 70 }}>{selected.user}</div>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: () => <div style={{ width: 170 }}>{selected.username}</div>,
    },
    {
      title: "Like",
      dataIndex: "like",
      key: "like",
      render: () => <div style={{ width: 50 }}>{selected.like}</div>,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: () => <div style={{ width: 250 }}>{selected.comment}</div>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: () => <div style={{ width: 200 }}>{selected.createdAt}</div>,
    },
  ];

  const columns2 = [
    {
      title: "Comment",
      dataIndex: "Comment",
      key: "Comment",
      // width: 250,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input.TextArea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          />
        ) : (
          <div>{selected.comment}</div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (_, record, index) => {
        return index === 1 ? (
          <Select
            value={newStatus}
            onChange={(value) => setNewStatus(value)}
            style={{ width: "150px" }}
          >
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Block">Block</Select.Option>
          </Select>
        ) : (
          <div style={{ width: "150px" }}>{newStatus}</div>
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
        title="Order Information"
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        bodyStyle={{ height: 600 }}
      >
        <div style={{ marginBottom: 16 }}>
          <h3>Order Details</h3>
          <Table
            columns={columns1}
            dataSource={[selected]}
            pagination={false}
            rowKey="id"
            style={{ marginBottom: 16 }}
          />
        </div>
        <div>
          <h3>Products</h3>
          <Table
            columns={columns2}
            dataSource={data1}
            pagination={false}
            rowKey="productId"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalCustomer;
