import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SellerUI from './assets/Seller-UI/SellerUI'
import CustomerUI from './assets/Customer-UI/CustomerUI'
import AdminUI from './assets/Admin-UI/AdminUI'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
  )
}

export default App
