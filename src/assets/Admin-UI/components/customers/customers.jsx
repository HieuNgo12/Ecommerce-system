import React, { useEffect, useState } from "react";
import {
  DownOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Table, Dropdown, Menu, Space } from "antd";
import ModalCustomer from "./modalCustomer";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Customers = () => {
  const { dataUserName, updateDataNewUserName } = useAdminContext();
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newData, setNewData] = useState(dataUserName);

  const dataWithChanged = dataUserName.map((item) => ({
    ...item,
    status: "Active",
    fullAddress: `${item.city}, ${item.street}, ${item.number}`,
    fullName: `${item.firstname} ${item.lastname}`,
    birthdate: item.birthdate.slice(0, 10),
  }));

  useEffect(() => setNewData(dataWithChanged), []);

  const updateData = (updatedData) => {
    setNewData(updatedData);
    updateDataNewUserName(updatedData);
  };

  const filtersID = dataWithChanged.map((item) => ({
    text: item.id.toString(),
    value: item.id.toString(),
  }));

  const filtersEmail = dataWithChanged.map((item) => ({
    text: item.email.toString(),
    value: item.email.toString(),
  }));

  const filtersUsername = dataWithChanged.map((item) => ({
    text: item.username.toString(),
    value: item.username.toString(),
  }));

  const filtersPhone = dataWithChanged.map((item) => ({
    text: item.phone.toString(),
    value: item.phone.toString(),
  }));

  const filtersFullName = dataWithChanged.map((item) => ({
    text: item.fullName,
    value: item.fullName,
  }));

  const filtersStatus = [
    { text: "Active", value: "Active" },
    { text: "Block", value: "Block" },
  ];

  const filtersGender = [
    { text: "Male", value: "Male" },
    { text: "Female", value: "Female" },
  ];

  const openModal = (select) => {
    setSelected(select);
    setModal(true);
  };

  const EyeOut = () => {
    setShowPassword(!showPassword);
  };

  const delUser = async (xxx) => {
    const res = await fetch(`https://fakestoreapi.com/users/${xxx}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    console.log(json);
    const updatedData = newData.filter((user) => user.id !== xxx);
    updateDataNewUserName(updatedData);
    toast("Delete successful!");
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <button onClick={() => delUser(record)}>Delete</button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      filters: filtersID,
      fixed: "left",
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div style={{ width: 50 }}>{record.id}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      showSorterTooltip: {
        target: "full-header",
      },
      fixed: "left",
      filters: filtersEmail,
      onFilter: (value, record) => record.email.indexOf(value) === 0,
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (text, record) => (
        <div style={{ width: 250 }}>{record.email}</div>
      ),
    },
    {
      title: "User",
      dataIndex: "username",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: filtersUsername,
      onFilter: (value, record) => record.username.indexOf(value) === 0,
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text, record) => (
        <div style={{ width: 165 }}>{record.username}</div>
      ),
    },
    {
      title: (
        <span>
          Password{" "}
          {showPassword ? (
            <EyeInvisibleOutlined onClick={EyeOut} />
          ) : (
            <EyeOutlined onClick={EyeOut} />
          )}
        </span>
      ),
      dataIndex: "password",
      render: (text) => (
        <div style={{ width: 165 }}>
          {showPassword ? text : "***************"}
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: filtersFullName,
      onFilter: (value, record) => record.fullName.indexOf(value) === 0,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      render: (text, record) => (
        <div style={{ width: 170 }}>{record.fullName}</div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: filtersPhone,
      onFilter: (value, record) => record.phone.indexOf(value) === 0,
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      render: (text, record) => (
        <div style={{ width: 200 }}>{record.phone}</div>
      ),
    },
    {
      title: "Birthday",
      dataIndex: "birthdate",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.birthdate}</div>
      ),
    },
    {
      title: "Image",
      dataIndex: "avatar",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          <img
            src={record.avatar}
            alt={record.fullName}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: filtersGender,
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
      render: (text, record) => (
        <div style={{ width: 80 }}>{record.gender}</div>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      render: (text, record) => <div style={{ width: 100 }}>{record.city}</div>,
    },
    {
      title: "Street",
      dataIndex: "street",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.street}</div>
      ),
    },
    {
      title: "Number",
      dataIndex: "number",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.number}</div>
      ),
    },
    {
      title: "Zipcode",
      dataIndex: "zipcode",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.zipcode}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: filtersStatus,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => (
        <div style={{ width: 50 }}>{record.status}</div>
      ),
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("Pagination:", pagination);
    console.log("Filters:", filters);
    console.log("Sorter:", sorter);
    console.log("Extra:", extra);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={newData}
        onChange={onChange}
        rowKey="id"
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        scroll={{ x: true, y: 950 }}
        style={{ maxWidth: 1072 }}
        sticky
      />
      {modal && (
        <ModalCustomer
          setModal={setModal}
          selected={selected}
          dataUserName={newData}
          updateData={updateData}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Customers;
