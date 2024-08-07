
import './App.css'
import AdminUI from './assets/Admin-UI/AdminUI'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ShoppingCart from './assets/Customer-UI/pages/ShoppingCart'
import HomePage from './assets/Customer-UI/pages/HomePage';
import { useState } from 'react';
function App() {
  const [user, setuser] = useState("customer")
  const adminRouter = createBrowserRouter([
    {
      path: "/",
      element: <AdminUI />,
    },
  ]);

  const customerRouter = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [

      ]
    },
    {
      path: "/shopping-cart",
      element: <ShoppingCart />,
    }
  ]);

  return (
    <>
     {user === "admin" && <RouterProvider router={adminRouter} />}
     {user === "customer" && <RouterProvider router={customerRouter} />}
    </>
  )
}

export default App
