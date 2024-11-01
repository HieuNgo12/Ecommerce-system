import React, { useState } from "react";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import Chart from "react-apexcharts";

const analytics = () => {
  // const { dataUserName, dataCart, dataProduct, dataReview } = useAdminContext();
  // const dataChanged = dataCart.map((item) => {
  //   const loop1 = item.products.map((item2) => {
  //     const loop2 = dataProduct.find(
  //       (item3) => parseInt(item3.id) === item2.productId
  //     );
  //     if (loop2) {
  //       return {
  //         ...item2,
  //         price: parseInt(loop2.price),
  //         totalPrice: loop2.price * item2.quantity,
  //       };
  //     }
  //     return item2;
  //   });
  //   const getTotalBill = loop1.reduce(
  //     (total, product) => total + product.totalPrice,
  //     0
  //   );
  //   return {
  //     ...item,
  //     products: loop1,
  //     totalBill: getTotalBill,
  //   };
  // });

  // const newDataCart = dataChanged.map((item) => ({
  //   ...item,
  //   year: item.date.slice(0, 4),
  //   month: item.date.slice(5, 7),
  //   day: item.date.slice(8, 10),
  // }));

  // const sortedDataCart = newDataCart.sort((a, b) => {
  //   const yearComparison = b.year - a.year;
  //   if (yearComparison !== 0) return yearComparison;

  //   const monthComparison = b.month - a.month;
  //   if (monthComparison !== 0) return monthComparison;

  //   return b.day - a.day;
  // });

  // const dayAndMonth = sortedDataCart.map((item) => {
  //   return `${item.month} / ${item.day}`;
  // });

  // const totalBill = sortedDataCart.map((item) => item.totalBill);

  // const getMonth = sortedDataCart.map((item) => item.month);

  // const dataChart = sortedDataCart.map((item) => ({
  //   month: item.month,
  //   totalBill: item.totalBill,
  // }));

  // const result = Array.from(new Set(dataChart.map((item) => item.month))).map(
  //   (month) => {
  //     const totalBill = dataChart
  //       .filter((item) => item.month === month)
  //       .reduce((sum, item) => sum + item.totalBill, 0);

  //     return { month, totalBill };
  //   }
  // );

  // const dataForMonth = result.map((item) => item.totalBill);

  // const dataMonthChart = [...new Set(getMonth)];

  // const combine = dataProduct
  //   .map((item) => {
  //     const loop1 = dataCart
  //       .map((item1) => {
  //         const loop2 = item1.products.filter(
  //           (item2) => item2.productId === parseInt(item.id)
  //         );

  //         return loop2.length > 0 ? loop2 : null;
  //       })
  //       .filter((loop) => loop !== null);

  //     if (loop1.length > 0) {
  //       return {
  //         ...item,
  //         sales: loop1.flat(), // Dùng flat() để làm phẳng mảng các sản phẩm
  //       };
  //     }
  //     return null;
  //   })
  //   .filter((result) => result !== null);

  // const bestSales = combine.map((item1) => {
  //   const loop1 = item1.sales.reduce((total, cal) => total + cal.quantity, 0);
  //   const totoPrice = loop1 * item1.price;
  //   return {
  //     ...item1,
  //     totalSales: loop1,
  //     totalPrice: totoPrice,
  //   };
  // });

  // const arrProduct = bestSales.map((item) => item.id);

  // const totalPrice = bestSales.map((item) => item.totalPrice);
  // const totalSales = bestSales.map((item) => item.totalSales);

  // const [options1] = useState({
  //   chart: {
  //     id: "apexchart-example",
  //   },
  //   xaxis: {
  //     categories: dataMonthChart,
  //   },
  // });

  // const [series1] = useState([
  //   {
  //     name: "series-1",
  //     data: dataForMonth,
  //   },
  // ]);

  // const [options2] = useState({
  //   chart: {
  //     id: "apexchart-example",
  //   },
  //   xaxis: {
  //     categories: dayAndMonth,
  //   },
  // });

  // const [series2] = useState([
  //   {
  //     name: "series-1",
  //     data: totalBill,
  //   },
  // ]);

  // const [options3] = useState({
  //   chart: {
  //     id: "apexchart-example",
  //   },
  //   xaxis: {
  //     categories: arrProduct,
  //   },
  // });

  // const [series3] = useState([
  //   {
  //     name: "series-1",
  //     data: totalPrice,
  //   },
  // ]);
  // const [options4] = useState({
  //   chart: {
  //     id: "apexchart-example",
  //   },
  //   xaxis: {
  //     categories: arrProduct,
  //   },
  // });

  // const [series4] = useState([
  //   {
  //     name: "series-1",
  //     data: totalSales,
  //   },
  // ]);

  return (
    <div>
      {/* <div className="flex">
        <div className="w-1/2">
          <div className="font-bold">Doanh Thu Từng Tháng</div>{" "}
          <Chart options={options1} series={series1} type="bar" height={500} />{" "}
        </div>
        <div className="w-1/2">
          <div className="font-bold">Doanh Thu Từng Ngày</div>{" "}
          <Chart options={options2} series={series2} type="bar" height={500} />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <div className="font-bold">Doanh Thu Của Từng Sản Phẩm</div>{" "}
          <Chart options={options3} series={series3} type="bar" height={500} />{" "}
        </div>
        <div className="w-1/2">
          <div className="font-bold">Số Lượng Bán Ra Của Sản Phẩm</div>{" "}
          <Chart options={options4} series={series4} type="bar" height={500} />
        </div>
      </div> */}
    </div>
  );
};

export default analytics;
