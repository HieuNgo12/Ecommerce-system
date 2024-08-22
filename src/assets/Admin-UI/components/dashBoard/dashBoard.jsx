import React, { useState } from "react";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { dataUserName, dataCart, dataProduct, dataReview, dataQuotes } =
    useAdminContext();
  const navigate = useNavigate();
  // console.log(dataCart);
  // console.log(dataProduct);
  // console.log(dataReview);

  const dataChanged = dataCart.map((item) => {
    const loop1 = item.products.map((item2) => {
      const loop2 = dataProduct.find(
        (item3) => parseInt(item3.id) === item2.productId
      );
      if (loop2) {
        return {
          ...item2,
          price: parseInt(loop2.price),
          totalPrice: loop2.price * item2.quantity,
        };
      }
      return item2;
    });
    const getTotalBill = loop1.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
    return {
      ...item,
      products: loop1,
      totalBill: getTotalBill,
    };
  });

  // console.log(dataChanged);

  const newDataCart = dataChanged.map((item) => ({
    ...item,
    year: item.date.slice(0, 4),
    month: item.date.slice(5, 7),
    day: item.date.slice(8, 10),
  }));

  const sortedDataCart = newDataCart.sort((a, b) => {
    const yearComparison = b.year - a.year;
    if (yearComparison !== 0) return yearComparison;

    const monthComparison = b.month - a.month;
    if (monthComparison !== 0) return monthComparison;

    return b.day - a.day;
  });

  const arrMonth = sortedDataCart.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate.getUTCMonth() === 2; // Tháng 03 là chỉ số 2 (bắt đầu từ 0)
  });

  let salesTotal = () => {
    let sum = 0;
    for (let i = 0; i < dataCart.length; i++) {
      let tam = dataCart[i].products;
      for (let j = 0; j < tam.length; j++) {
        for (let m = 0; m < dataProduct.length; m++) {
          if (tam[j].productId === parseInt(dataProduct[m].id)) {
            sum = sum + tam[j].quantity * dataProduct[i].price;
          }
        }
      }
    }
    return sum;
  };

  const combine = dataProduct
    .map((item) => {
      const loop1 = dataCart
        .map((item1) => {
          const loop2 = item1.products.filter(
            (item2) => item2.productId === parseInt(item.id)
          );

          return loop2.length > 0 ? loop2 : null;
        })
        .filter((loop) => loop !== null);

      if (loop1.length > 0) {
        return {
          ...item,
          sales: loop1.flat(), // Dùng flat() để làm phẳng mảng các sản phẩm
        };
      }
      return null;
    })
    .filter((result) => result !== null);

  const bestSales = combine.map((item1) => {
    const loop1 = item1.sales.reduce((total, cal) => total + cal.quantity, 0);
    const totoPrice = loop1 * item1.price;
    return {
      ...item1,
      totalSales: loop1,
      totalPrice: totoPrice,
    };
  });

  const sortBestSales = bestSales.sort((a, b) => b.totalPrice - a.totalPrice);

  const orderTab = () => {
    navigate("/orders");
  };
  const customresTab = () => {
    navigate("/customers");
  };
  const productsTab = () => {
    navigate("/products");
  };
  const quotesTab = () => {
    navigate("/quotes");
  };
  const promotionTab = () => {
    navigate("/promotion");
  };
  const analyticsTab = () => {
    navigate("/analytics");
  };

  return (
    <div className="p-6 bg-gray-50 flex-grow overflow-auto">
      <div className="grid grid-cols-3 gap-4">
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={analyticsTab}
        >
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold">{`$ ${salesTotal()}`}</p>
        </div>
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={customresTab}
        >
          <h3 className="text-lg font-semibold">Customers</h3>
          <p className="text-2xl font-bold">{dataUserName.length}</p>
        </div>
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={orderTab}
        >
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold">{dataCart.length}</p>
        </div>
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={productsTab}
        >
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-2xl font-bold">{dataProduct.length}</p>
        </div>
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={quotesTab}
        >
          <h3 className="text-lg font-semibold">Quotes</h3>
          <p className="text-2xl font-bold">{dataQuotes.length}</p>
        </div>
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={promotionTab}
        >
          <h3 className="text-lg font-semibold">Promotion</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div
          className="col-span-3 bg-white p-4 rounded-md shadow-md cursor-pointer"
          onClick={analyticsTab}
        >
          <h3 className="text-lg font-semibold">Best Selling In Month</h3>
          {sortBestSales.slice(0, 3).map((item, index) => (
            <ul key={index} className="mt-4 space-y-2">
              <li>
                {item.title} -{" "}
                <span className="font-semibold text-red-500">
                  ${item.totalPrice}
                </span>
              </li>
            </ul>
          ))}
        </div>
        <div className="col-span-3 bg-white p-4 rounded-md shadow-md">
          <h3
            className="text-lg font-semibold cursor-pointer"
            onClick={() => orderTab()}
          >
            Recent Orders
          </h3>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="text-left">Item</th>
                <th className="text-left">Date</th>
                <th className="text-left">User ID</th>
                <th className="text-left">Total Bill</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {arrMonth.map((item, index) => (
                <tr key={index}>
                  <td className="text-left">{item.id}</td>
                  <td className="text-left">{item.date}</td>
                  <td className="text-left">{item.userId}</td>
                  <td className="text-left">{item.totalBill}</td>
                  <td className="text-left">Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
