import React from "react";
import img from "../img/chart.png";
import { AdminProvider, useAdminContext } from "../../AdminContext";

function Dashboard() {
  const { dataUserName, dataCart, dataNewProduct } = useAdminContext();
  let customerTotal = () => {
    let sum = 0;
    for (let i = 0; i < dataUserName.length; i++) {
      sum = sum + 1;
    }
    return sum;
  };

  let orderTotal = () => {
    let sum = 0;
    for (let i = 0; i < dataCart.length; i++) {
      sum = sum + 1;
    }
    return sum;
  };

  let salesTotal = () => {
    let sum = 0;
    for (let i = 0; i < dataCart.length; i++) {
      let tam = dataCart[i].products;
      for (let j = 0; j < tam.length; j++) {
        for (let m = 0; m < dataNewProduct.length; m++) {
          if (tam[j].productId === parseInt(dataNewProduct[m].id)) {
            sum = sum + tam[j].quantity * dataNewProduct[i].price;
          }
        }
      }
    }
    return sum;
  };

  return (
    <div className="p-6 bg-gray-50 flex-grow overflow-auto">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold">{`$ ${salesTotal()}`}</p>
          <img src={img} alt="" />
        </div>
        <div className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col">
          <h3 className="text-lg font-semibold">Customers</h3>
          <p className="text-2xl font-bold">{customerTotal()}</p>
          <img src={img} alt="" />
        </div>
        <div className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold">{orderTotal()}</p>
          <img src={img} alt="" />
        </div>
        <div className="col-span-3 bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Best Selling</h3>
          <p className="text-2xl font-bold">$2,400</p>
          <ul className="mt-4 space-y-2">
            <li>Classic Monochrome Tees - $940 Sales</li>
            <li>Monochromatic Wardrobe - $780 Sales</li>
            <li>Essential Neutrals - $740 Sales</li>
          </ul>
        </div>
        <div className="col-span-3 bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="text-left">Item</th>
                <th className="text-left">Date</th>
                <th className="text-left">Total</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mens Black T-Shirts</td>
                <td>20 Mar, 2023</td>
                <td>$75.00</td>
                <td>Processing</td>
              </tr>
              <tr>
                <td>Essential Neutrals</td>
                <td>19 Mar, 2023</td>
                <td>$22.00</td>
                <td>Processing</td>
              </tr>
              <tr>
                <td>Sleek and Cozy Black</td>
                <td>7 Feb, 2023</td>
                <td>$57.00</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>MOCKUP Black</td>
                <td>29 Jan, 2023</td>
                <td>$30.00</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>Monochromatic Wardrobe</td>
                <td>27 Jan, 2023</td>
                <td>$27.00</td>
                <td>Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
