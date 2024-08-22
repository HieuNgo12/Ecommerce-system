import React, { useState } from "react";
import { Modal, Table, Input, Select, Image } from "antd";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { comment } from "postcss";
import { key } from "localforage";

const ModalCustomer = ({ dataNewProduct, setModal, selected, updateData }) => {
  const { dataReview, callApi } = useAdminContext();
  const [newStatus, setNewStatus] = useState(selected.status);
  const [newData, setNewData] = useState();
  const [newReply, setNewReply] = useState();

  console.log(newReply);
  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = () => {
    const changeStatus = dataNewProduct.map((item) => {
      if (item.id === selected.id) {
        return {
          ...item,
          status: newStatus,
        };
      } else {
        return item;
      }
    });
    setNewData(changeStatus);
    updateData(changeStatus);
    toast("Update successful!");
  };

  const handleEdit = async (xxx) => {
    try {
      const res = await fetch(
        `https://66bce56424da2de7ff6c2c3e.mockapi.io/reviews/${xxx.id}`,
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

  const handleDelete = async (xxx) => {
    try {
      const res = await fetch(
        `https://66bce56424da2de7ff6c2c3e.mockapi.io/reviews/${xxx.id}`,
        {
          method: "DELETE",
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
      render: () => selected.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: () => selected.title,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: () => (
        <img src={selected.image} style={{ width: "100px", height: "100px" }} />
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: () => (
        <div style={{ width: 70 }}>
          <div>{selected.rating.rate}</div>
        </div>
      ),
    },
    {
      title: "Rating Count",
      dataIndex: "rating",
      key: "rating",
      render: () => (
        <div style={{ width: 90 }}>
          <div>{selected.rating.count}</div>
        </div>
      ),
    },
    {
      title: "Total Comment",
      dataIndex: "comment",
      key: "comment",
      width: 150,
      render: (text, record) => (
        <div style={{ width: 70 }}>
          <div>{selected.totalComment}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: () => {
        return (
          <Select
            style={{ width: "150px" }}
            value={newStatus}
            onChange={(value) => setNewStatus(value)}
          >
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Block">Block</Select.Option>
            <Select.Option value="Block Comment">Block Comment</Select.Option>
            <Select.Option value="Block Rating">Block Rating</Select.Option>
          </Select>
        );
      },
    },
  ];

  const columns2 = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 50,
      render: (review, record) => (
        <div style={{ width: "50px" }}>
          {selected.review.map((item, index) => (
            <div key={index} className="py-3">
              {index + 1}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      // width: 150,
      render: (review, record) => (
        <div>
          {selected.review.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item.comment}
              disabled
              className="py-3"
              style={{ width: "280px" }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Like",
      dataIndex: "like",
      key: "like",
      width: 50,
      render: (review, record) => (
        <div>
          {selected.review.map((item, index) => (
            <div key={index} className="py-3">
              {item.like}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: 200,
      render: (review, record) => (
        <div>
          {selected.review.map((item, index) => (
            <div key={index} className="py-3">
              {item.createdAt}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      width: 100,
      render: (review, record) => (
        <div>
          {selected.review.map((item, index) => (
            <div key={index} className="py-3">
              {item.user}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
      width: 400,
      render: (review, record) => (
        <div>
          {record.review.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                type="text"
                className="py-2"
                style={{ width: "235px" }}
                value={item.reply || ""}
                onChange={(e) => {
                  const updatedReview = [...record.review];
                  updatedReview[index].reply = e.target.value;
                  setNewReply(e.target.value);
                }}
              />
              <button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#1677ff",
                  color: "white",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  borderRadius: "5px",
                }}
                onClick={() => handleEdit(item)}
              >
                Save
              </button>
              <button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#1677ff",
                  color: "white",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  borderRadius: "5px",
                }}
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ),
    },
  ];

  // const data1 = [
  //   { key: "1" }, // Row for current information
  // ];

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
        <div style={{ marginBottom: 16 }}>
          <h3>Review Details</h3>
          <Table
            columns={columns1}
            dataSource={[selected]}
            pagination={false}
            showHeader={true}
          />
          <div style={{ overflow: "auto", maxHeight: 400 }}>
            <Table
              columns={columns2}
              dataSource={[selected]}
              pagination={false}
              rowKey="productId"
            />
          </div>
        </div>
      </Modal>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default ModalCustomer;
