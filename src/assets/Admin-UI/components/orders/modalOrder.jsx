import React from "react";
import { Modal, Table } from "antd";

const ModalOrder = ({ setModal, selected, dataProducts }) => {
  const productsData = selected.products.map((product) => {
    const matchedProduct = dataProducts.find(
      (item) => item.id === product.productId
    );
    return {
      productId: product.productId,
      quantity: product.quantity,
      pricePerUnit: matchedProduct ? matchedProduct.price : 0,
      totalPrice: matchedProduct ? product.quantity * matchedProduct.price : 0,
    };
  });

  // Calculate total bill
  const totalBill = productsData.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );

  // Handle Modal actions
  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = () => {
    alert("Cập nhập thành công!");
  };

  // Define columns for the Ant Table
  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price Per Unit",
      dataIndex: "pricePerUnit",
      key: "pricePerUnit",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];

  return (
    <Modal
      title="Order Information"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1200}
      bodyStyle={{ height: 400 }}
    >
      <Table
        columns={columns}
        dataSource={productsData}
        pagination={false}
        rowKey="productId"
        footer={() => <div>Total Bill: {totalBill}</div>}
      />
    </Modal>
  );
};

export default ModalOrder;
