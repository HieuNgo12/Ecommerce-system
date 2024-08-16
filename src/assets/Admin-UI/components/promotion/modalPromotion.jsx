import React, { useState } from "react";
import { Modal, Table, Input, Select, Image } from "antd";

const ModalCustomer = ({ setModal, selected, dataUserName, updateData }) => {
  const [newPhone, setNewPhone] = useState(selected.phone);
  const [newImage, setNewImage] = useState(selected.image);
  const [newFirstName, setNewFirstName] = useState(selected.name.firstname);
  const [newLastName, setNewLastName] = useState(selected.name.lastname);
  const [newCity, setNewCity] = useState(selected.address.city);
  const [newNumber, setNewNumber] = useState(selected.address.number);
  const [newStreet, setNewStreet] = useState(selected.address.street);
  const [newStatus, setNewStatus] = useState(selected.status);

  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/users/${selected.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: {
              firstname: newFirstName,
              lastname: newLastName,
            },
            address: {
              city: newCity,
              number: newNumber,
              street: newStreet,
            },
            phone: newPhone,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error updating customer:", error);
    }

    const updatedCustomer = {
      ...selected,
      phone: newPhone,
      name: {
        firstname: newFirstName,
        lastname: newLastName,
      },
      address: {
        city: newCity,
        number: newNumber,
        street: newStreet,
      },
      image: newImage,
      status: newStatus,
    };

    const updatedUserList = dataUserName.map((item) =>
      item.id === selected.id
        ? {
            ...item,
            ...updatedCustomer,
            fullName: `${newFirstName} ${newLastName}`,
            fullAddress: `${newCity}, ${newStreet}, ${newNumber}`,
          }
        : item
    );

    updateData(updatedUserList);
    alert("Cập nhật thành công!");
    setModal(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: () => selected.id,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: () => selected.email,
    },
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      render: () => selected.username,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (_, record, index) => {
        return index === 1 ? (
          <Input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        ) : (
          newPhone
        );
      },
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
        ) : (
          newFirstName
        );
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
        ) : (
          newLastName
        );
      },
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (_, record, index) => {
        return index === 1 ? (
          <Input value={newCity} onChange={(e) => setNewCity(e.target.value)} />
        ) : (
          newCity
        );
      },
    },
    {
      title: "Street",
      dataIndex: "street",
      key: "street",
      render: (_, record, index) => {
        return index === 1 ? (
          <Input value={newStreet} onChange={(e) => setNewStreet(e.target.value)} />
        ) : (
          newStreet
        );
      },
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (_, record, index) => {
        return index === 1 ? (
          <Input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        ) : (
          newNumber
        );
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record, index) => {
        return index === 1 ? (
          <Input value={newImage} onChange={(e) => setNewImage(e.target.value)} />
        ) : (
          <Image src={newImage || selected.image} alt="Customer" width={100} />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record, index) => {
        return index === 1 ? (
          <Select value={newStatus} onChange={(value) => setNewStatus(value)}>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="block">Block</Select.Option>
          </Select>
        ) : (
          newStatus
        );
      },
    },
  ];

  const data = [
    { key: "1" }, // Row for current information
    { key: "2" }, // Row for input fields
  ];

  return (
    <Modal
      title="Customer Information"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1200}
      bodyStyle={{ height: 400 }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        showHeader={true}
      />
    </Modal>
  );
};

export default ModalCustomer;
