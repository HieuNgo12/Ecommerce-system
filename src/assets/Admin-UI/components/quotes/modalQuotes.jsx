import React, { useState } from "react";
import { Modal, Table, Input, Select, Image } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalQuotes = ({ openModal, selected, dataQuotes, updatedQuotes }) => {
  const [newStatus, setNewStatus] = useState(selected.status);
  const [newReply, setNewReply] = useState(selected.reply);
  const [quotes, setQuotes] = useState();

  const handleCancel = () => {
    openModal(false);
  };

  const handleOk = () => {
    const newData = dataQuotes.map((item) => {
      if (selected.id === item.id) {
        return {
          ...item,
          status: newStatus,
          reply: newReply,
        };
      }
      return item;
    });
    console.log(newData);
    setQuotes(newData);
    updatedQuotes(newData);
    toast.success("Updated successful!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => openModal(false),
    });
  };

  const columns1 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: () => selected.id,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: () => selected.author,
    },
    {
      title: "Date Created",
      dataIndex: "dateCreate",
      key: "dateCreate",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.dateCreate}</div>
      ),
    },
    {
      title: "Date Response",
      dataIndex: "reply",
      key: "reply",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.dateReply}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: () => (
        <Select
          value={newStatus}
          onChange={(value) => setNewStatus(value)}
          style={{ width: "150px" }}
        >
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Block">Block</Select.Option>
        </Select>
      ),
    },
  ];

  const columns2 = [
    {
      title: "Quotes",
      dataIndex: "quotes",
      key: "quotes",
      // width: 250,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input.TextArea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          />
        ) : (
          <div>
            <div>{selected.quote}</div>
            <input type="text" value={newReply} />
          </div>
        );
      },
    },
  ];

  const data = [
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
            dataSource={data}
            pagination={false}
            rowKey="productId"
          />
        </div>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
    </div>
  );
};

export default ModalQuotes;
