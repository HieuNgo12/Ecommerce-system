import React, { useEffect, useState } from "react";
import "./BillingPageBody.css";
import { Link, redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loading from "../utils/Loading";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Required at least 2 letters")
    .max(50, "Required maximum 50 letters")
    .required("First Name Is Required"),
  companyName: Yup.string()
    .min(2, "Company must be at least 2 letters")
    .max(50, "Company name must be maximum 50 letters")
    .required("Company name is Required"),
  streetAddress: Yup.string().required("Required"),
  apartment: Yup.string(),
  townCity: Yup.string().required("Town City is Required"),
  phoneNumber: Yup.number(),
  emailAddress: Yup.string()
    .required("Email is Required")
    .email("Invalid email"),
});
function ShoppingCartBody() {
  const [subTotal, setSubTotal] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState(false);
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [showPaymentMethod, setShowPaymentMethod] = useState(true);

  const token = localStorage.getItem("token");
  const formik = useFormik({
    initialValues: {
      firstName: "",
      companyName: "",
      streetAddress: "",
      apartment: "",
      townCity: "",
      phoneNumber: "",
      emailAddress: "",
      couponCode: "",
      paymentMethod: "Credit",
      saveThisInformation: "",
      cardNumber: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log(values);

      setLoading(true);
      const billingList =
        JSON?.parse(localStorage?.getItem("billingList")) || [];
      for (let i = 0; i < billingList.length; i++) {
        let price = 0;
        billingList[i][1].forEach((billing) => {
          price += Number(billing.price);
        });
        // console.log(JSON.parse(localStorage.getItem("user").email));
        const response = await axios
          .post(`https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/order`, {
            headers: { Authorization: `Bearer ${token}` },

            body: {
              firstName: values.firstName,
              companyName: values.companyName,
              streetAddress: values.streetAddress,
              apartment: values.apartment,
              townCity: values.townCity,
              paymentMethod: values.paymentMethod,
              emailAddress: values.emailAddress,
              phoneNumber: phoneNumberInput,
              paymentCard: values.cardNumber,
              productName: billingList[i][0],
              quantity: billingList[i][2],
              userEmail: JSON.parse(localStorage.getItem("user")).email,
              amount: price || 0,
            },
          })
          .then(function (response) {
            // window.location="/";
            toast.success("Order Created Successfully", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () => navigate("/"),
            });
          })
          .then(() => {
            window.location.href = "/";
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      // return redirect("");

      // setSuccess(true);
    },
  });
  const coupons = [
    {
      id: 1,
      title: "123456",
    },
    {
      id: 2,
      title: "123457",
    },
  ];
  useEffect(() => {
    const processData = () => {
      let subTotalOverall = 0;

      const cartList = JSON?.parse(localStorage?.getItem("billingList")) || [];
      let cartItemList = [];
      let quantityCartList = {};
      cartList.map((item) => {
        subTotalOverall += Number(item[1][0].price) * Number(item[2]);

        return item;
      });
      setSubTotal(subTotalOverall);
      setItemList(cartList);
    };
    processData();
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [loading]);

  return (
    <div className=" shopping-cart">
      <form onSubmit={formik.handleSubmit}>
        {loading && <Loading />}
        <ul className="breadcrumb text-left">
          <li>Account</li>
          <li>My Account</li>
          <li>Product</li>
          <li>View Cart</li>
          <li className="bold">Checkout</li>
        </ul>
        <div className="flex ml-auto">
          <div className="flex words-left">
            <div>
              <h1 className="billing-details">Billing Details</h1>
              <div>
                <div>First Name</div>
                <input
                  id="firstName"
                  name="firstName"
                  type="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />

                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.firstName && (
                      <div>{formik.errors.firstName}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Company Name</div>
                <input
                  id="companyName"
                  name="companyName"
                  type="companyName"
                  onChange={formik.handleChange}
                  value={formik.values.companyName}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.companyName && (
                      <div>{formik.errors.companyName}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Street Address</div>
                <input
                  id="streetAddress"
                  name="streetAddress"
                  type="streetAddress"
                  onChange={formik.handleChange}
                  value={formik.values.streetAddress}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.streetAddress && (
                      <div>{formik.errors.streetAddress}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Apartment, floor .etc. {"(optional)"}</div>
                <input
                  id="apartment"
                  name="apartment"
                  type="apartment"
                  onChange={formik.handleChange}
                  value={formik.values.apartment}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.apartment && (
                      <div>{formik.errors.apartment}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Town/City</div>
                <input
                  id="townCity"
                  name="townCity"
                  type="townCity"
                  onChange={formik.handleChange}
                  value={formik.values.townCity}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.townCity && (
                      <div>{formik.errors.townCity}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Phone Number</div>
                <PhoneInput
                  className="number"
                  country={"us"}
                  value={phoneNumberInput}
                  onChange={(e) => {
                    console.log(e);
                    setPhoneNumberInput(e);
                  }}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.phoneNumber && (
                      <div>{formik.errors.phoneNumber}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>Email Address</div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="emailAddress"
                  onChange={formik.handleChange}
                  value={formik.values.emailAddress}
                />
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.emailAddress && (
                      <div>{formik.errors.emailAddress}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                {showPaymentMethod ? (
                  <>
                    <div>Card Number</div>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="cardNumber"
                      onChange={formik.handleChange}
                      value={formik.values.cardNumber}
                    />
                  </>
                ) : null}
                <div className="flex">
                  <div className="error-field ">
                    {" "}
                    {formik.errors.cardNumber && (
                      <div>{formik.errors.cardNumber}</div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="flex">
                <input className="save-this-info" type="checkbox" />

                <div className="mt-auto">
                  Save this information for faster check-out next time
                </div>
              </div> */}
            </div>
          </div>
          <div className="ml-96">
            {itemList.length &&
              itemList.map((item) => {
                return (
                  <div className="flex item-card">
                    <img src={item[1][0].img} className="item-image" />
                    <div>{item[1][0].title + " x " + item[2]}</div>
                    <div className="price">
                      {(Number(item[1][0].price) || 0) * item[2] + " $"}
                    </div>
                  </div>
                );
              })}
            <div className="flex item-card border-grey">
              <div>Subtotal:</div>
              <div className="price">
                {Number(Math.round(subTotal * 100) / 100) || 0 + " $"}
              </div>
            </div>
            <div className="flex item-card border-grey">
              <div>Shipping:</div>
              <div className="price">Free</div>
            </div>
            <div className="flex item-card">
              <div>Total:</div>
              <div className="price">
                {Number(Math.round(subTotal * 100) / 100) || 0 + " $"}
              </div>
            </div>

            <div className="flex mb-6">
              <input
                type="radio"
                name="paymentMethod"
                value="Credit"
                className="mt-auto"
                defaultChecked={true}
                onChange={(e) => {
                  console.log(e.target.value);
                  formik.values.paymentMethod = e.target.value;
                  setShowPaymentMethod(true);
                }}
              />
              <div className="ml-2 mt-auto">Bank</div>
              <div className="flex image-box">
                <img src="./icons/payment-methods/Bkash.png" />
                <img src="./icons/payment-methods/Visa.png" />
                <img src="./icons/payment-methods/Mastercard.png" />
                <img src="./icons/payment-methods/Nagad.png" />
              </div>
            </div>

            <div className="flex mb-6">
              <input
                name="paymentMethod"
                value="Cash"
                type="radio"
                onChange={(e) => {
                  console.log(e.target.value);
                  formik.values.paymentMethod = e.target.value;
                  setShowPaymentMethod(false);
                }}
              />
              <div className="ml-2">Cash On Delivery</div>
            </div>
            {couponMessage ? (
              coupons.filter((coupon) => {
                // console.log(coupon.title?.toString(), couponCode);
                return coupon.title?.toString() === couponCode;
              }).length ? (
                <div className="text-left text-green-500">
                  Succeeded to apply coupon message
                </div>
              ) : (
                <div className="text-left text-red-500">
                  Failed to apply coupon message
                </div>
              )
            ) : null}

            <div className="flex">
              <button className="button-style" type="submit">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShoppingCartBody;
