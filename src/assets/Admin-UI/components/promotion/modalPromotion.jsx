import React, { useState } from "react";
import { Modal, Table, Input, Select, Image } from "antd";
import { useAdminContext } from "../../AdminContext";

const ModalCustomer = ({openModal}) => {
  const { dataPromotion} = useAdminContext();
  const [newStatus, setNewStatus] = useState();

  const handleCancel = () => {
    openModal(false);
  };

  const handleOk = async () => {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: () => dataPromotion.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Promotional Price",
      dataIndex: "promotionalPrice",
      key: "promotionalPrice",
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
      dataIndex: "status",
      key: "status",
      width: 100,
      render: () => (
        <Select style={{width: "100px"}} value={newStatus} onChange={(value) => setNewStatus(value)}>
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="block">Block</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <Modal
      title="Promotion Information"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1200}
      bodyStyle={{ height: 400 }}
    >
      <Table
        columns={columns}
        dataSource={[dataPromotion]}
        pagination={false}
        showHeader={true}
      />
    </Modal>
  );
};

export default ModalCustomer;
