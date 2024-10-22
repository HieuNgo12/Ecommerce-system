import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Pagination, TextField } from "@mui/material";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { redirect } from "react-router-dom";
import OrderRow from "./OrderRow";

function DeliveryStatusModal({ order, open, setOpen, ...props }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    console.log(order);
  });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Cancelling Order</b>
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to cancel this order?
          </Typography>

          <button
            class="bg-blue-500 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-6 mt-10"
            type="submit"
            onClick={() => {
              setOpen(false);
              axios.post(`http://localhost:8080/api/v1/order/cancelOrder`, {
                orderId: order._id,
              });
              window.location.reload();
            }}
          >
            Yes
          </button>
          <button
            class="bg-blue-500 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            onClick={() => {setOpen(false)}}
          >
            No
          </button>
          {/* <div className="flex">
            <div>Payment Due: {order.deliveryId?.orderReceivedDate || new Date(+new Date() + 2 * 24 * 60 * 60 * 1000)}</div>
            <div></div>
          </div> */}
        </Box>
      </Modal>{" "}
    </div>
  );
}

export default DeliveryStatusModal;
