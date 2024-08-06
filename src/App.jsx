import { useState } from 'react';
import './App.css';
import SellerUI from './assets/Seller-UI/SellerUI';
import CustomerUI from './assets/Customer-UI/CustomerUI';
import AdminUI from './assets/Admin-UI/AdminUI';
import ProductList from './assets/Products/ProductList';
import ProductDetails from './assets/Products/ProductDetails';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState("customer");
  const adminRouter = createBrowserRouter([
    {
      path: "/",
      element: <AdminUI />,
    },
  ]);

  const customerRouter = createBrowserRouter([
    {
      path: "/",
      element: <CustomerUI />,
    },
    {
      path: "/productlist",
      element: <ProductList />, // Define route for ProductList
    },
    {
      path: "/product/:id",
      element: <ProductDetails />, // Define route for ProductDetails
    }
  ]);


  const sellerRouter = createBrowserRouter([
    {
      path: "/",
      element: <SellerUI />,
    },
  ]);

  return (
    <>
      {user === "admin" && <RouterProvider router={adminRouter} />}
      {user === "seller" && <RouterProvider router={sellerRouter} />}
      {user === "customer" && <RouterProvider router={customerRouter} />}
    </>
  );
}

export default App;
