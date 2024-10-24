import { useFormik } from "formik";
import React from "react";
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
function PaymentStatusModal({ order, open, setOpen, ...props }) {
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
            Payment Status
          </Typography>
          <div className="flex">
            <div><b>Payment Card:</b></div>
            <div>{order?.paymentId?.paymentCard}</div>
          </div>
          <div className="flex">
            <div><b>Payment Method:</b></div>
            <div>{order?.paymentMethod}</div>
          </div>
          <div className="flex">
            <div><b>Payment Due:</b></div>
            <div>{order?.paymentId?.paymentDue.slice(0,10) + "|" + order?.paymentId?.paymentDue.slice(11,16)}</div>
          </div>
          <div className="flex">
            <div><b>Payment Created At:</b></div>
            <div>{order?.paymentId?.createdAt.slice(0,10) + "|" +order?.paymentId?.paymentDue.slice(11,16)}</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PaymentStatusModal;
