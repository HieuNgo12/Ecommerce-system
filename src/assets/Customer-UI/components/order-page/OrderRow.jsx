import React, { useEffect, useState } from "react";
import "./OrderRow.css";
import DeliveryStatusModal from "./DeliveryStatusModal";
import PaymentStatusModal from "./PaymentStatusModal";
import CancelOrderModal from "./CancelOrderModal";
import axios from "axios";
import { toast } from "react-toastify";
function OrderRow({ order, setOpen, setLoading, ...props }) {
  const [deliveryStatusModal, setDeliveryStatusModal] = useState(false);
  const [paymentStatusModal, setPaymentStatusModal] = useState(false);
  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const [couponCodeName, setCouponCodeName] = useState("");

  useEffect(() => {
    console.log(order);
  }, []);
  return (
    <tr
      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      style={
        order?.deliveryId?.deliveryStatus === "Cancelled"
          ? { backgroundColor: "yellow" }
          : { backgroundColor: "white" }
      }
    >
      <td class="px-6 py-4">
        <div className="update-order" style={{ color: "purple" }}>
          {order._id}
        </div>{" "}
      </td>
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          style={{ width: "50px", height: "50px" }}
          src={order.productId?.image}
        />
      </th>
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {order.productId?.title}
      </th>
      <td class="px-6 py-4"> {order.quantity}</td>
      <td class="px-6 py-4">{order.amount}</td>
      <td class="px-6 py-4">{order.streetAddress}</td>
      <td class="px-6 py-4">{order.phoneNumber}</td>

      <td class="px-6 py-4">
        <div
          className="update-order"
          style={{ color: "purple" }}
          onClick={() => {
            setDeliveryStatusModal(true);
          }}
        >
          Delivery Status
        </div>{" "}
      </td>
      <td class="px-6 py-4">
        <div
          className="update-order"
          style={{ color: "green" }}
          onClick={() => {
            setPaymentStatusModal(true);
          }}
        >
          Payment Status
        </div>{" "}
      </td>
      {/* <td
        class="px-6 py-4"
        onClick={() => {
          setOpen(true);
        }}
      >
        <div style={{ color: "blue" }} className="update-order">
          Update Order
        </div>{" "}
      </td> */}
      <td class="px-6 py-4 flex">
        <div className="flex mt-10">
          <input
            className="coupon-input "
            placeholder="Coupon Code"
            id="couponCode"
            name="couponCode"
            type="couponCode"
            onChange={(e) => setCouponCodeName(e.target.value)}
          />
          <button
            className="button-style apply"
            onClick={async () => {
              try {
                const data = await axios.get(
                  `http://localhost:8080/api/v1/coupon?couponCodeName=${couponCodeName}&order=${order._id}`
                );
                if (data.data.data.status !== "Used") {
                  toast.success("Apply Coupon Successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  window.location.reload();
                } else {
                  toast.error("Coupon already been used", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              } catch (e) {
                console.log(e);
                toast.error("Fail to Apply Coupon Not Available", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
            }}
          >
            Apply Coupon
          </button>
        </div>
      </td>
      {order?.deliveryId?.deliveryStatus !== "Cancelled" ? (
        <td class="px-6 py-4">
          <div
            style={{ color: "red" }}
            className="update-order"
            onClick={() => {
              setCancelOrderModal(true);
            }}
          >
            Cancel Order
          </div>{" "}
        </td>
      ) : null}
      <CancelOrderModal
        order={order}
        open={cancelOrderModal}
        setOpen={setCancelOrderModal}
      />
      <DeliveryStatusModal
        order={order}
        open={deliveryStatusModal}
        setOpen={setDeliveryStatusModal}
      />
      <PaymentStatusModal
        order={order}
        open={paymentStatusModal}
        setOpen={setPaymentStatusModal}
      />
    </tr>
  );
}

export default OrderRow;
