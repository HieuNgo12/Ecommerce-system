import React from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import sort from "../svg/icon-sort-vertical-svgrepo-com.svg";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import ModalOrder from "./modalOrder";
import { AdminProvider, useAdminContext } from "../../AdminContext";

const Orders = () => {
  const { dataCart, dataNewProduct, dataUserName } = useAdminContext();
  const [selected, setSelected] = useState();
  const [modal, setModal] = useState(false);

  const dataChanged = dataCart.map((item) => {
    const dataName = dataUserName.find(
      (item2) => parseInt(item2.id) === item.userId
    );
    if (dataName) {
      return {
        ...item,
        status: "New",
        fristname: dataName.firstname,
        lastname: dataName.lastname,
        username: dataName.username,
        email: dataName.email,
        city: dataName.city,
        street: dataName.street,
        number: dataName.number,
        phone: dataName.phone,
        fullName: `${dataName.firstname} ${dataName.lastname}`,
      };
    }
    return item;
  });

  const opdenModal = (xxx) => {
    setSelected(xxx);
    setModal(true);
  };

  const filtersID = dataCart.map((item) => ({
    text: item.id.toString(),
    value: item.id.toString(),
  }));

  const uniqueUserIDs = [...new Set(dataCart.map((item) => item.userId))];

  const filtersUserID = uniqueUserIDs.map((item) => ({
    text: item.toString(),
    value: item.toString(),
  }));

  const filtersEmail = dataChanged.map((item) => ({
    text: item.email.toString(),
    value: item.email.toString(),
  }));

  const filtersUsername = dataChanged.map((item) => ({
    text: item.username.toString(),
    value: item.username.toString(),
  }));

  const filtersPhone = dataChanged.map((item) => ({
    text: item.phone.toString(),
    value: item.phone.toString(),
  }));

  const filtersFullName = dataChanged.map((item) => ({
    text: item.fullName,
    value: item.fullName,
  }));

  const filtersStatus = [
    { text: "New", value: "New" },
    { text: "Prepare", value: "Prepare" },
    { text: "Delivery", value: "Delivery" },
    { text: "Complete", value: "Complete" },
    { text: "Refund", value: "Refund" },
    { text: "Resolve", value: "Resolve" },
  ];

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => opdenModal(record)}>Edit</button>
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
      key: "id",
      dataIndex: "id",
      fixed: "left",
      filters: filtersID,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div style={{ width: 50 }}>{record.id}</div>,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      fixed: "left",
      filters: filtersUserID,
      onFilter: (value, record) =>
        record.userId.toString().indexOf(value) === 0,
      sorter: (a, b) => a.userId - b.userId,
      render: (text, record) => <div style={{ width: 80 }}>{record.userId}</div>,
    },
    {
      title: "User",
      dataIndex: "username",
      showSorterTooltip: {
        target: "full-header",
      },
      fixed: "left",
      filters: filtersUsername,
      onFilter: (value, record) => record.username.indexOf(value) === 0,
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text, record) => (
        <div style={{ width: 165 }}>{record.username}</div>
      ),
    },
    {
      title: "Pro ID",
      key: "productId",
      render: (text, record) => (
        <div style={{ width: 80 }}>
          {record.products.map((item, index) => (
            <div key={index} className="py-1">
              {item.productId}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Price Per",
      key: "productId",
      width: 100,
      render: (text, record) => {
        const loop1 = record.products
          .map((product) => {
            console.log;
            const loop2 = dataNewProduct.find(
              (item) => parseInt(item.id) === product.productId
            );
            if (loop2) {
              return {
                productId: product.productId,
                price: parseInt(loop2.price),
              };
            }
            return null;
          })
          .filter((item) => item !== null);

        return (
          <div>
            {loop1.map((item, index) => (
              <div style={{ width: 80 }} key={index} className="py-1">
                {item.price}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Quantity",
      key: "quantity",
      width: 80,
      render: (text, record) => (
        <div>
          {record.products.map((product, idx) => (
            <div style={{ width: 80 }} key={idx} className="py-1">
              {product.quantity}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (text, record) => {
        const totalPrices = record.products.map((product) => {
          const matchedProduct = dataNewProduct.find(
            (dataProduct) => parseInt(dataProduct.id) === product.productId
          );
          if (matchedProduct) {
            const eachPrice = product.quantity * matchedProduct.price;
            return eachPrice;
          }
          return 0;
        });

        return (
          <div>
            {totalPrices.map((price, index) => (
              <div style={{ width: 80 }} key={index} className="py-1">
                {price}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Total Bill",
      key: "total",
      render: (text, record) => {
        const totalPrices = record.products.map((product) => {
          const matchedProduct = dataNewProduct.find(
            (dataProduct) => parseInt(dataProduct.id) === product.productId
          );
          if (matchedProduct) {
            return product.quantity * matchedProduct.price;
          }
          return 0;
        });

        const totalPrice = totalPrices.reduce((acc, curr) => acc + curr, 0);

        return <div style={{ width: 100 }} >{totalPrice}</div>;
      },
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
      render: (text) => <div style={{ width: 80 }}>{text.slice(0, 10)}</div>,
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

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={dataChanged}
        rowKey={(record) => record.userId}
        scroll={{ x: true, y: 950 }}
        style={{ maxWidth: 1072 }}
        sticky
      />
      {modal && (
        <ModalOrder
          setModal={setModal}
          selected={selected}
          dataCart={dataCart}
          dataProducts={dataNewProduct}
        />
      )}
    </div>
  );
};

export default Orders;
