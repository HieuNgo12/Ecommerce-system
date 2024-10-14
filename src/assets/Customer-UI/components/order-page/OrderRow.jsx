import React, { useState } from "react";
import "./OrderRow.css";
import DeliveryStatusModal from "./DeliveryStatusModal";
import PaymentStatusModal from "./PaymentStatusModal";
function OrderRow({ order, setOpen, ...props }) {
  const [deliveryStatusModal, setDeliveryStatusModal] = useState(false);
  const [paymentStatusModal, setPaymentStatusModal] = useState(false);

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img style={{ width: "50px", height: "50px" }} src={order.image} />
      </th>
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {order.productName}
      </th>
      <td class="px-6 py-4"> {order.quantity}</td>
      <td class="px-6 py-4">{order.totalAmount}</td>
      <td class="px-6 py-4">{order.address}</td>
      <td class="px-6 py-4">{order.phoneNumber}</td>

      <td class="px-6 py-4">{order.paymentMethod}</td>

      <td class="px-6 py-4">
        <div className="update-order" onClick={() => {
            setDeliveryStatusModal(true);
        }}>
          Delivery Status
        </div>{" "}
      </td>
      <td class="px-6 py-4">
        <div className="update-order"  onClick={() => {
            setPaymentStatusModal(true);
        }}>Payment Status</div>{" "}
      </td>
      <td
        class="px-6 py-4"
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="update-order">Update Order</div>{" "}
      </td>
      <DeliveryStatusModal open={deliveryStatusModal} setOpen={setDeliveryStatusModal}/>
      <PaymentStatusModal open={paymentStatusModal} setOpen={setPaymentStatusModal}/>

    </tr>
  );
}

export default OrderRow;
