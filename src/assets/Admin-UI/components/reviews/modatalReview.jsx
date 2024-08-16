import React, { useState } from "react";
import { Modal, Table, Input, Select, Image } from "antd";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ModalCustomer = ({ dataUserName, setModal, selected, updateData }) => {
  const [newPhone, setNewPhone] = useState(selected.phone);
  const [newImage, setNewImage] = useState(selected.image);
  const [newFirstName, setNewFirstName] = useState(selected.firstname);
  const [newLastName, setNewLastName] = useState(selected.lastname);
  const [newCity, setNewCity] = useState(selected.city);
  const [newNumber, setNewNumber] = useState(selected.number);
  const [newStreet, setNewStreet] = useState(selected.street);
  const [newStatus, setNewStatus] = useState(selected.status);
  const [newBirthdate, setNewBirthdate] = useState(selected.birthdate);
  const [newGender, setNewGender] = useState(selected.gender);
  const [newZipcode, setNewZipcode] = useState(selected.zipcode);

  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = async () => {
    toast("Update successful!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input.TextArea
            style={{ width: "150px" }}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newTitle}</div>
        );
      },
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      width: 200,
      render: (_, record, index) => {
        return index === 1 ? (
          <>
            <Input
              style={{ width: "200px" }}
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              className="w-48"
            />
          </>
        ) : (
          <Image src={newImage || selected.avatar} alt="Customer" width={100} />
        );
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (_, record, index) => {
        return index === 1 ? (
          <Select value={newStatus} onChange={(value) => setNewStatus(value)}>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Block">Block</Select.Option>
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

  const data2 = [
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
        bodyStyle={{ height: 600 }}
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
