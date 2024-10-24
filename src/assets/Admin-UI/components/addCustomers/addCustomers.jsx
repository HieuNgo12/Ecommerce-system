import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Password from "antd/es/input/Password";

const AddCustomers = () => {
  // const { callApi,  } = useAdminContext();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newImage, setNewImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const createNewProduct = async () => {
    try {
      const req1 = await fetch("http://localhost:8080/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          confirm: confirmPass,
        }),
      });
      const res1 = await req1.json();
      const userId = res1.data._id;

      const formData = new FormData();

      if (newImage) {
        formData.append("file", newImage); // Thêm tệp vào FormData
      }
      formData.append("userId", userId);

      const req2 = await fetch(
        `http://localhost:8080/api/v1/admin/single-upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const res2 = await req2.json();
      console.log(res2);

      const req3 = await fetch(
        `http://localhost:8080/api/v1/admin/update-profile/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: res2.secure_url,
          }),
        }
      );

      const res3 = await req3.json();
      console.log(res3);
      toast.success("Create Account successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => navigate("/admin/customers"),
      });
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Something went wrong, please try again.", {
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
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Customers</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Email *</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">User Name *</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Password *</label>
          <input
            className="w-full p-2 border rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Confirm Password *</label>
          <input
            className="w-full p-2 border rounded"
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Gender</label>
          <select
            className="w-full p-2 border rounded"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
          </select>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">BirthDay</label>
          <input
            className="w-full p-2 border rounded"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Phone</label>
          <div>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Zipcode</label>
          <div>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">First Name</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">First Name</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Address Number</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Address Street</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Address City</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <label className="block mb-2">Images</label>
          <div className="flex gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-28 p-2 border rounded bg-gray-200"
            />
            <input
              type="text"
              value={newImage.name}
              disabled
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="col-span-12">
          <button
            className="w-full p-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={createNewProduct}
          >
            Save Account
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCustomers;
