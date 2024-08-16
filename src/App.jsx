import { useState } from 'react';
import './App.css';
import SellerUI from './assets/Seller-UI/SellerUI';
import AdminUI from './assets/Admin-UI/AdminUI';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import HomePage from './assets/Customer-UI/pages/HomePage';
import ShoppingCart from './assets/Customer-UI/pages/ShoppingCart';
import ProfilePage from './assets/Customer-UI/pages/ProfilePage';

function App() {
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
      element: <HomePage />,
      children: [

      ]
    },
    {
      path: "/shopping-cart",
      element: <ShoppingCart />,
    },
    {
      path: "/edit-page",
      element: <ProfilePage />,
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
