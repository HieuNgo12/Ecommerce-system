import React, { useEffect, useState } from "react";
import { AdminProvider, useAdminContext } from "../../AdminContext";
import Chart from "react-apexcharts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Analytics = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [token, setToken] = useState("");

  const month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const callRefreshToken = async (xxx) => {
    try {
      const req = await fetch(
        "https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/auth/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${xxx}`,
          },
        }
      );
      const res = await req.json();
      const newToken = res.accessToken;
      return newToken;
    } catch (err) {
      console.log("error", err);
      return null;
    }
  };

  useEffect(() => {
    const getToken = getCookieValue("token");
    if (getToken) {
      setToken(getToken);
    } else {
      toast.warn("Please log in first!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, []);

  useEffect(() => {
    if (token) {
      callApi();
    }
  }, [token]);

  useEffect(() => {
    if (dataOrder) {
      const updatedMonth1 = dataOrder.map((item) => {
        return { ...item, createdAt: item.createdAt.slice(5, 7) };
      });

      const updatedMonth2 = updatedMonth1.filter((item) => {
        month.map((item2) => {
          item2 === item.createdAt;
        });
      });
      console.log(updatedMonth2);
    }
  }, [dataOrder]);

  const callApi = async () => {
    try {
      const req1 = await fetch("https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/get-all-order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (req1.status == 403) {
        const req2 = await callRefreshToken(token);
        if (!req2) throw new Error("Please log in again!");
        setToken(req2);
        setCookie("token", req2, 7);
        const req3 = await fetch("https://04cb76fe-96cf-4ebe-a0c6-7a2435772034.eu-central-1.cloud.genez.io/api/v1/get-all-order", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        if (req3.status === 200) {
          const res3 = await req3.json();
          setDataOrder(res3.data);
        }
      }
      if (req1.status === 200) {
        const res3 = await req1.json();
        setDataOrder(res3.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
      <div className="flex">
        <div className="w-1/2">
          <div className="font-bold">Doanh Thu Từng Tháng</div>{" "}
          {/* <Chart options={options1} series={series1} type="bar" height={500} />{" "} */}
        </div>
        <div className="w-1/2">
          <div className="font-bold">Doanh Thu Từng Ngày</div>{" "}
          {/* <Chart options={options2} series={series2} type="bar" height={500} /> */}
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <div className="font-bold">Doanh Thu Của Từng Sản Phẩm</div>{" "}
          {/* <Chart options={options3} series={series3} type="bar" height={500} />{" "} */}
        </div>
        <div className="w-1/2">
          <div className="font-bold">Số Lượng Bán Ra Của Sản Phẩm</div>{" "}
          {/* <Chart options={options4} series={series4} type="bar" height={500} /> */}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Analytics;
