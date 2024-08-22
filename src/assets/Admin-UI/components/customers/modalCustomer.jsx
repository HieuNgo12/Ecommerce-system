import React, { useState } from "react";
import { Modal, Table, Input, Select, Image } from "antd";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ModalCustomer = ({ setModal, selected,  }) => {
  const {callApi} = useAdminContext();
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
    try {
      const response = await fetch(
        `https://66b0ab0f6a693a95b539b080.mockapi.io/users/${selected.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: newFirstName,
            lastname: newLastName,
            city: newCity,
            number: newNumber,
            street: newStreet,
            phone: newPhone,
            birthdate: newBirthdate,
            avatar: newImage,
            gender: newGender,
            zipcode: newZipcode,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      callApi()
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
      console.error("Error updating customer:", error);
    }
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
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "150px" }}
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newPhone}</div>
        );
      },
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "150px" }}
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newFirstName}</div>
        );
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "150px" }}
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newLastName}</div>
        );
      },
    },
    {
      title: "Birthday",
      dataIndex: "birthdate",
      key: "birthdate",
      width: 125,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "125px" }}
            type="date"
            value={newBirthdate}
            onChange={(e) => setNewBirthdate(e.target.value)}
          />
        ) : (
          newBirthdate
        );
      },
    },
  ];

  const columns2 = [
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (_, record, index) => {
        return index === 1 ? (
          <Select
            style={{ width: "100px" }}
            value={newGender}
            onChange={(value) => setNewGender(value)}
          >
            <Select.Option value="Famale">Famale</Select.Option>
            <Select.Option value="Male">Male</Select.Option>
          </Select>
        ) : (
          newGender
        );
      },
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "150px" }}
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newCity}</div>
        );
      },
    },
    {
      title: "Street",
      dataIndex: "street",
      key: "street",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "150px" }}
            value={newStreet}
            onChange={(e) => setNewStreet(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newStreet}</div>
        );
      },
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      width: 150,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "150px" }}
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        ) : (
          <div style={{ width: "150px" }}>{newNumber}</div>
        );
      },
    },
    {
      title: "Zipcode",
      dataIndex: "zipcode",
      key: "zipcode",
      render: (_, record, index) => {
        return index === 1 ? (
          <Input
            style={{ width: "100px" }}
            value={newZipcode}
            onChange={(e) => setNewZipcode(e.target.value)}
          />
        ) : (
          <div style={{ width: "100px" }}>{newZipcode}</div>
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
        <Table
          columns={columns2}
          dataSource={data2}
          pagination={false}
          showHeader={true}
        />
      </Modal>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default ModalCustomer;
