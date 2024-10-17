import React, { useState } from "react";
import { Modal, Input, Select, Form, Image } from "antd";
import { useAdminContext } from "../../AdminContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalCustomer = ({ setModal, selected }) => {
  const { callApi } = useAdminContext();
  const [form] = Form.useForm();
  const [newImage, setNewImage] = useState(selected.avatar);
  const [phone, setPhone] = useState(selected.phone);
  const [newUploadImage, setNewUploadImage] = useState();

  const handleCancel = () => {
    setModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result);
        setNewUploadImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Lấy tất cả giá trị từ form

      const formData = new FormData();
      if (newUploadImage) {
        formData.append("file", newUploadImage); // Thêm tệp vào FormData
      }
      formData.append("userId", selected._id);

      const req1 = await fetch(
        "http://localhost:8080/api/v1/admin/single-upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const response = await fetch(
        `http://localhost:8080/api/v1/admin/update-profile/${selected.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            avatar: newImage,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      callApi();
      toast.success("Updated successfully!", {
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

  return (
    <Modal
      title="Customer Information"
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          id: selected._id,
          email: selected.email,
          userName: selected.userName,
          firstname: selected.firstname,
          lastname: selected.lastname,
          dateOfBirth: selected.dateOfBirth,
          gender: selected.gender,
          phone: selected.phone,
          city: selected.city,
          street: selected.street,
          number: selected.number,
          zipcode: selected.zipcode,
          birthdate: selected.birthdate,
          status: selected.status,
        }}
      >
        <Form.Item label="User ID" name="id">
          <Input disabled />
        </Form.Item>

        <Form.Item label="User ID" name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label="User ID" name="userName">
          <Input disabled />
        </Form.Item>

        <Form.Item label="First Name" name="firstname">
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastname">
          <Input />
        </Form.Item>
        <Form.Item label="Date Of Birth" name="dateOfBirth">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input
            type="number"
            min={0}
            value={phone < 0 ? 0 : phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="City" name="city">
          <Input />
        </Form.Item>

        <Form.Item label="Street" name="street">
          <Input />
        </Form.Item>

        <Form.Item label="Number" name="number">
          <Input />
        </Form.Item>

        <Form.Item label="Zipcode" name="zipcode">
          <Input />
        </Form.Item>

        <Form.Item label="Birthdate" name="birthdate">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="suspended">Suspended</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Image">
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {newImage && (
            <Image src={newImage} alt="Customer Avatar" width={100} />
          )}
        </Form.Item>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

export default ModalCustomer;
