import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Pagination, TextField } from "@mui/material";
import "./OpenModal.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { redirect } from "react-router-dom";
import OrderRow from "./OrderRow";
import Loading from "../utils/Loading";

function OrderModal() {
  const [open, setOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchProductInput, setSearchProductInput] = useState("");
  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, [loading]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const SignupSchema = Yup.object().shape({
    quantity: Yup.string()
      .min(2, "Required at least 2 letters")
      .max(50, "Required maximum 50 letters"),
    //   .required("First Name Is Required"),
    name: Yup.string()
      .min(2, "Product Name must be at least 2 letters")
      .max(50, "Product Name name must be maximum 50 letters"),
    //   .required("Product Name is Required"),
    //   streetAddress: Yup.string().required("Required"),
    totalAmount: Yup.string(),
    address: Yup.string(),
    // .required("Address is Required"),
    phone: Yup.number()
      //   .required("Phone Number is Required")
      .min(9, "Required at least 9 numbers"),
    paymentMethod: Yup.string(),
    // .required("Payment Method is Required"),
  });
  async function getOrder() {
    try {
      const itemsPerPage = 3;
      const original = await axios.get(
        `https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/order?user=${
          JSON.parse(localStorage.getItem("user"))?.email
        }`
      );
      const response = await axios.get(
        `https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/order?limit=${itemsPerPage}&page=${currentPage}&user=${
          JSON.parse(localStorage.getItem("user"))?.email
        }`,
        {}
      );
      console.log(original);
      const data = original.data.content;
      const itemInPage = response.data.content;
      setPageCount(Math.ceil(data.length / itemsPerPage));
      console.log(itemInPage);
      setOrderList(itemInPage);
    } catch (error) {
      console.error(error);
    } finally {
    }
  }
  useEffect(() => {

    getOrder();
  }, [currentPage]);
  //   useEffect(() => {
  //     async function getOrder() {
  //       try {
  //         setOrderList(itemInPage);
  //         // setOrderList(detailedOrders);
  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //       }
  //     }
  //     getOrder();
  //   }, [searchProductInput]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const formik = useFormik({
    initialValues: {
      quantity: "",
      name: "",
      totalAmount: "",
      address: "",
      phone: "",
      paymentMethod: "",
      image: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log(values);
      setOpen(false);
      await axios.patch("https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/order", {
        body: {
          id: "123",
          ...values,
        },
      });
      window.location.reload();
    },
  });
  const handlePageClick = ({ selected }) => {
    console.log(selected)
    // setLoading(true);
    setCurrentPage(selected + 1);
  };
  return loading ? (
    <Loading />
  ) : (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Modal
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                id="quantity"
                name="quantity"
                type="quantity"
                placeholder="Quantity"
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />

              <div className="flex">
                <div className="error-field ">
                  {" "}
                  {formik.errors.quantity && (
                    <div>{formik.errors.quantity}</div>
                  )}
                </div>
              </div>
            </div>
            <div></div>{" "}
            <div>
              <input
                id="address"
                name="address"
                type="address"
                placeholder="Address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />

              <div className="flex">
                <div className="error-field ">
                  {" "}
                  {formik.errors.address && <div>{formik.errors.address}</div>}
                </div>
              </div>
            </div>{" "}
            <div>
              <input
                id="phone"
                name="phone"
                type="phone"
                placeholder="Phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />

              <div className="flex">
                <div className="error-field ">
                  {" "}
                  {formik.errors.phone && <div>{formik.errors.phone}</div>}
                </div>
              </div>
            </div>
            <div>
              <input
                id="paymentMethod"
                name="paymentMethod"
                type="paymentMethod"
                placeholder="Payment Method"
                onChange={formik.handleChange}
                value={formik.values.paymentMethod}
              />

              <div className="flex">
                <div className="error-field ">
                  {" "}
                  {formik.errors.paymentMethod && (
                    <div>{formik.errors.paymentMethod}</div>
                  )}
                </div>
              </div>
            </div>{" "}
            {/* <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload file
            </label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            ></input> */}
            {/* <div className="flex mt-10">
              <input
                className="coupon-input "
                placeholder="Coupon Code"
                id="couponCode"
                name="couponCode"
                type="couponCode"
                onChange={formik.handleChange}
                value={formik.values.couponCode}
              />
              <button
                className="button-style apply"
                onClick={async () => {
                  try {
                    const data = await axios.get(
                      "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/coupon",
                      { couponCodeName: "mindX" }
                    );
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                Apply Coupon
              </button>
            </div> */}
            <div className="mt-10">
              <button
                class="bg-blue-500 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
              <button
                class="bg-blue-500 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>{" "}
     
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              
            <th scope="col" class="px-6 py-3">
                Order ID
              </th>
              <th scope="col" class="px-6 py-3">
                Image
              </th>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Total Amount
              </th>
              <th scope="col" class="px-6 py-3">
                Address
              </th>
              <th scope="col" class="px-6 py-3">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {orderList.length
              ? orderList.map((order) => {
                  console.log(order);
                  return (
                    <OrderRow
                    getOrder={getOrder}
                      setLoading={setLoading}
                      order={order}
                      setOpen={setOpen}
                    />
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default OrderModal;
