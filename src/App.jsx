import { useState } from 'react';
import './App.css';
import SellerUI from './assets/Seller-UI/SellerUI';
import CustomerUI from './assets/Customer-UI/CustomerUI';
import AdminUI from './assets/Admin-UI/AdminUI';
import ProductList from './assets/Products/ProductList';
import ProductDetails from './assets/Products/ProductDetails';
import ProductWishlist from './assets/Products/ProductWishlist';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import ErrorPage from './assets/Customer-UI/pages/ErrorPage';
import HomePage from './assets/Customer-UI/pages/HomePage';
import ShoppingCart from './assets/Customer-UI/pages/ShoppingCart';
import LoginPage from './assets/Customer-UI/pages/LoginPage';

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
      path: "/login-page",
      element: <LoginPage />,
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
