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
    width: 1000,
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
            Delivery Status
          </Typography>
          <div>
            <div className="flex grid grid-cols-4 gap-4">
              <div className="font-bold">Order Placed</div>
              <div className="font-bold">Estimated Order Delivering </div>
              <div className="font-bold">Estimated Order Received </div>
              {order.deliveryId.deliveryStatus === "Cancelled" ? (
                <div className="font-bold text-yellow-400">Cancelled Date </div>
              ) : null}
            </div>
            <div className="flex grid grid-cols-4 gap-4">
              <div>
                {order?.deliveryId?.orderPlacedDate.slice(0, 10) +
                  "|" +
                  order?.deliveryId?.orderPlacedDate.slice(11, 16)}
              </div>
              <div>
                {order?.deliveryId?.orderReceivedDate.slice(0, 10) +
                  "|" +
                  order?.deliveryId?.orderPlacedDate.slice(11, 16)}
              </div>
              <div>
                {order?.deliveryId?.deliveryDate.slice(0, 10) +
                  "|" +
                  order?.deliveryId?.orderPlacedDate.slice(11, 16)}
              </div>
              <div>
              {order.deliveryId.deliveryStatus === "Cancelled" ? (
                <div className="font-bold text-yellow-400">Cancelled Date </div>
              ) : null}
              </div>
            </div>
          </div>
          <div className="flex">
            <div>
              <b>Delivery Status:</b>{" "}
              {order.deliveryId?.deliveryStatus || "Checking"}
            </div>
            <div></div>
          </div>
          <div className="flex">
            <div>
              <b>Estimated Delivery Date:</b>{" "}
              {
                order?.deliveryId?.orderReceivedDate.slice(0, 10)
                // new Date(+new Date() + 2 * 24 * 60 * 60 * 1000)
              }
            </div>
            <div></div>
          </div>
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
