import React, { useState } from "react";
import { Modal, Input, Select, Form, Image } from "antd";
import { useAdminContext } from "../../AdminContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalCustomer = ({ setModal, selected, callApi, callRefreshToken }) => {
  // const { callApi } = useAdminContext();
  const [form] = Form.useForm();
  const [newImage, setNewImage] = useState(selected.avatar);
  const [phone, setPhone] = useState(selected.phone);
  const [gender, setGender] = useState(
    selected.gender === true ? "Man" : "Woman"
  );
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

  const formData = new FormData();
  if (newUploadImage) {
    formData.append("file", newUploadImage); // Thêm tệp vào FormData
  }
  formData.append("userId", selected._id);

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Lấy tất cả giá trị từ form
      console.log(values);
      const req1 = await fetch(
        "http://localhost:8080/api/v1/admin/update-profile",
        {
          method: "PATCH",
          body: { ...values, formData },
        }
      );
      if (req1.status === 403) {
        console.log("check");
        const req2 = await callRefreshToken()
      }
      //   const res1 = await req1.json();
      //   callApi();
      //   toast.success("Updated successfully!", {
      //     position: "top-center",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     onClose: () => setModal(false),
      //   });
      // } catch (error) {
      //   console.error("Error : ", error);
      //   toast.error("Something went wrong, please try again.", {
      //     position: "top-center",
      //     autoClose: 1500,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
    } catch (error) {
      console.log("error", error);
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
          _id: selected._id,
          email: selected.email,
          username: selected.username,
          userName: selected.userName,
          firstName: selected.firstName,
          lastName: selected.lastName,
          dateOfBirth: selected.dateOfBirth,
          gender: selected.gender,
          phone: selected.phone,
          city: selected.city,
          street: selected.street,
          number: selected.number,
          zipcode: selected.zipcode,
          status: selected.status,
        }}
      >
        <Form.Item label="User ID" name="_id">
          <Input disabled />
        </Form.Item>

        <Form.Item label="User ID" name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label="User Name" name="username">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input disabled />
        </Form.Item>

        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName">
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
          <Select value={gender} onChange={(value) => setGender(value)}>
            <Select.Option value={false}>Male</Select.Option>
            <Select.Option value={true}>Female</Select.Option>
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
