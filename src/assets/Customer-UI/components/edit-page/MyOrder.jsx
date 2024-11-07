import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Typography, Row, Col } from "antd";

function MyOrder({ userData, refreshToken, callApi }) {
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState([]);

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  useEffect(() => {
    if (!userData || !userData._id) {
      return;
    }
  }, [userData]);

  useEffect(() => {
    const getToken = getCookieValue("token");
    if (!getToken) {
      toast.warn("Please log in to get information!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setToken(getToken);
  }, []);

  console.log(orders);
  useEffect(() => {
    const callApi = async () => {
      try {
        const req = await fetch(
          `https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/get-order/${userData._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (req.status === 403) {
          const newToken = await refreshToken(token);
          if (!newToken) throw new Error("Please log in again!");
          setToken(newToken);
          setCookie(newToken);
          const req1 = await fetch(
            `https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/get-order/${userData.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          );
          if (req1.status === 200) {
            const res1 = await req1.json();
            setOrders(res1.data);
          } else {
            throw new Error("Failed to fetch orders");
          }
        }
        if (req.status === 200) {
          const res = await req.json();
          setOrders(res.data);
        } else {
          throw new Error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (token) {
      callApi();
    }
  }, [token, userData]);

  const columns = [
    {
      title: "Order Infor",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>ID : </div>
            <div>{record._id}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>
              Created At :{" "}
            </div>
            <div>{record.createdAt.slice(0, 10)}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>
              Total Bill ($):{" "}
            </div>
            <div>{record.quantity * record.productId.price}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>
              Payment Method:{" "}
            </div>
            <div>{record.paymentMethod}</div>
          </div>
          <div style={{ fontWeight: "bold" }}>
            <div style={{ color: "red", fontWeight: "bold" }}>Status : </div>
            <div>{record.status}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Customer Infor",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Name : </div>
            <div>
              {record.userId.firstName} {record.userId.lastName}
            </div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Email : </div>
            <div>{record.userId.email}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Username : </div>
            <div>{record.userId.username}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Phone : </div>
            <div>{record.userId.phone}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Products Order",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Title : </div>
            <div>{record.productId.title}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Price ($): </div>
            <div>{record.productId.price}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Quantity : </div>
            <div>{record.quantity}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Delivery Address",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Name : </div>
            <div>{record.firstName}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Apartment : </div>
            <div>{record.apartment}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Address : </div>
            <div>{record.streetAddress}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>City : </div>
            <div>{record.townCity}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>
              Company Name :{" "}
            </div>
            <div>{record.companyName}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Phone : </div>
            <div>{record.phoneNumber}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Delivery Satus",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>ID : </div>
            <div>{record.deliveryId._id}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>OPD : </div>
            <div>{record.deliveryId.orderPlacedDate.slice(0, 10)}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>EDD : </div>
            <div>{record.deliveryId.deliveryDate.slice(0, 10)}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>ORD : </div>
            <div>{record.deliveryId.orderReceivedDate.slice(0, 10)}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>
              Cancel Date :{" "}
            </div>
            <div>{record.deliveryId.cancelDate.slice(0, 10)}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>Receiver : </div>
            <div>{record.deliveryId.userId}</div>
          </div>
          <div>
            <div style={{ color: "red", fontWeight: "bold" }}>
              Status Delivery :{" "}
            </div>
            <div style={{ fontWeight: "bold" }}>
              {record.deliveryId.deliveryStatus}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "70%",
        margin: "auto",
        padding: "30px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography.Title
        level={2}
        style={{ color: "#007BFF", textAlign: "center", marginBottom: "30px" }}
      >
        My Order
      </Typography.Title>
      <dvi style={{}}>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          sticky
        />
      </dvi>

      <ToastContainer />
    </div>
  );
}

export default MyOrder;
