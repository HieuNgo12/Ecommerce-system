import React from "react";
import "./ProfilePageBody.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string().required("Required"),
  confirmNewPassword: Yup.string().required("Required")     .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')  ,
});

function ProfilePageBody() {
  const formik = useFormik({
    initialValues: {
      email: "",
      address: "",
      firstName: "",
      lastName: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const userList = JSON.parse(localStorage.getItem("userList")) || [];
      userList.push(values);
      alert(JSON.stringify(values, null, 2));
      localStorage.setItem("userList", JSON.stringify(userList));
    },
  });
  return (
    <div className="container">
      <div className="flex">
        <ul className="breadcrumb text-left">
          <li>Home</li>
          <li>Cart</li>
        </ul>
        <div className="flex welcome">
          <p>Welcome!</p>
          <p className="mcl-rimmel "> Mcl Rimel</p>
        </div>
      </div>
      <div className="flex">
        <div>
          <div className="head-link">Manage My account</div>
          <ul className="mt-5">
            <li className="profile">My Profile</li>
            <li>Address Book</li>
            <li>My Payment Option</li>
          </ul>
          <div className="head-link mt-5">My Orders</div>
          <ul className="mt-5">
            <li>My Returns</li>
            <li>My Cancellations</li>
          </ul>
          <div className="head-link mt-5">My Wishlist</div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="ml-32">
            <div className="edit-your-profile">Edit Your Profile</div>
            <div>
              <div>
                <div className="flex">
                  <div className="text-very-left ">First Name</div>
                  <div className="text-very-left">Last Name</div>
                </div>
                <div className="flex">
                  <input
                    id="firstName"
                    name="firstName"
                    type="firstName"
                    className="short-input"
                    placeholder="Md"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                  <input
                    id="lastName"
                    name="lastName"
                    type="lastName"
                    className="short-input"
                    placeholder="Rimel"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                </div>
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.firstName && (
                      <div>{formik.errors.firstName}</div>
                    )}
                  </div>
                  <div className="error-field ">
                    {" "}
                    {formik.errors.firstName && (
                      <div>{formik.errors.firstName}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <div className="text-very-left ">Email</div>
                  <div className="text-very-left">Address</div>
                </div>
                <div className="flex">
                  <input
                    className="short-input"
                    placeholder="rimel1111@gmail.com"
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <input
                    className="short-input"
                    id="address"
                    name="address"
                    type="address"
                    placeholder="Kingston, 5236, United States"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </div>
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.email && <div>{formik.errors.email}</div>}
                  </div>
                  <div className="error-field ">
                    {" "}
                    {formik.errors.address && (
                      <div>{formik.errors.address}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="password">Password Changes</div>
                </div>
                <div className="flex">
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    className="long-input"
                    placeholder="Current Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </div>
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.currentPassword && (
                      <div>{formik.errors.currentPassword}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    className="long-input"
                    placeholder="New Password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.newPassword && <div>{formik.errors.newPassword}</div>}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    className="long-input"
                    placeholder="Confirm New Password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmNewPassword}
                  />
                </div>
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.confirmNewPassword && (
                      <div>{formik.errors.confirmNewPassword}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="cancel-button ">Cancel</button>
              <button type="submit" className="save-changes">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePageBody;
