import React, { useState } from "react";
import { Modal, Table, Select } from "antd";

const { Option } = Select;

const ModalOrder = ({ setModal, selected }) => {
  const {
    products = [],
    id,
    username,
    totalBill,
    status,
    phone,
    userId,
    date,
  } = selected;

  console.log(selected);
  const [newStatus, setNewStatus] = useState(status);

  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = () => {
    alert("Cập nhật thành công!");
  };

  const productColumns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => <div>{record.productId}</div>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <div>{record.title}</div>,
    },
    {
      title: "Price Per Unit",
      dataIndex: "price",
      key: "price",
      render: (text, record) => <div>{record.price}</div>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => <div>{record.quantity}</div>,
    },
    {
      title: "Total Price",
      key: "totalPrice",
      render: (text, record) => <div>{record.quantity * record.price}</div>,
    },
  ];

  const orderColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: () => <div>{id}</div>,
    },
    {
      title: "user ID",
      dataIndex: "userId",
      key: "userId",
      render: () => <div>{userId}</div>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: () => <div>{username}</div>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: () => <div>{phone}</div>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: () => <div>{date.slice(0, 10)}</div>,
    },
    {
      title: "Total Bill",
      dataIndex: "totalBill",
      key: "totalBill",
      render: () => <div>{totalBill}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: () => (
        <Select
          value={newStatus}
          onChange={(value) => setNewStatus(value)}
          style={{ width: "150px" }}
        >
          <Option value="New">New</Option>
          <Option value="Prepare">Prepare</Option>
          <Option value="Delivery">Delivery</Option>
          <Option value="Complete">Complete</Option>
          <Option value="Refund">Refund</Option>
          <Option value="Resolve">Resolve</Option>
        </Select>
      ),
    },
  ];

  return (
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
          columns={orderColumns}
          dataSource={[selected]} // Pass selected as an array
          pagination={false}
          rowKey="id"
          style={{ marginBottom: 16 }}
        />
      </div>
      <div>
        <h3>Products</h3>
        <Table
          columns={productColumns}
          dataSource={products}
          pagination={false}
          rowKey="productId"
        />
      </div>
    </Modal>
  );
};

export default ModalOrder;
