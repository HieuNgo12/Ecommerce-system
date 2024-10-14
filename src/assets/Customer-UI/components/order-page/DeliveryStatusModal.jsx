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

function DeliveryStatusModal({ open, setOpen, ...props }) {
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
           
              <div>Order Placed</div>
              <div>Order Delivering </div>
              <div>Order Received </div>
            </div>
            <div className="flex grid grid-cols-4 gap-4">
              <div>11/11/2024</div>
              <div>16/11/2024</div>
              <div>20/11/2024</div>
            </div>
          </div>
          <div className="flex">
            <div>Delivery Status: </div>
            <div></div>
          </div>
          <div className="flex">
            <div>Estimated Delivery Date: </div>
            <div></div>
          </div>
          <div className="flex">
            <div>Payment Due:</div>
            <div></div>
          </div>
        </Box>
      </Modal>{" "}
    </div>
  );
}

export default DeliveryStatusModal;
