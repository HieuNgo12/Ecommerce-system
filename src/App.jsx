import "./App.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./assets/Customer-UI/pages/HomePage";
import ShoppingCart from "./assets/Customer-UI/pages/ShoppingCart";
import ProductList from "./assets/Products/ProductList";
import ProductDetails from "./assets/Products/ProductDetails";
import ProductWishlist from "./assets/Products/ProductWishlist";
import ErrorPage from "./assets/Customer-UI/pages/ErrorPage";
import ContactPage from "./assets/Customer-UI/pages/ContactPage";
import AboutPage from "./assets/Customer-UI/pages/AboutPage";
import BillingPage from "./assets/Customer-UI/pages/BillingPage";
import ProfilePage from "./assets/Customer-UI/pages/ProfilePage";
import AdminUI from "./assets/Admin-UI/AdminUI";
import Dashboard from "./assets/Admin-UI/components/dashBoard/dashBoard";
import Products from "./assets/Admin-UI/components/products/products";
import Orders from "./assets/Admin-UI/components/orders/orders";
import Customers from "./assets/Admin-UI/components/customers/customers";
import Promotion from "./assets/Admin-UI/components/promotion/promotion";
import Reviews from "./assets/Admin-UI/components/reviews/reviews";
import LogIn from "./assets/Admin-UI/components/logIn/logIn_admin";
import SignUp from "./assets/Admin-UI/components/signUp/signUp_admin";
import Test from "./assets/Admin-UI/test";
import AddProduct from "./assets/Admin-UI/components/addProduct/addProduct";
import Analytics from "./assets/Admin-UI/components/analytics/analytics";
import Quotes from "./assets/Admin-UI/components/analytics/analytics";
import Rating from "./assets/Admin-UI/components/rating/rating";
import AddCustomers from "./assets/Admin-UI/components/addCustomers/addCustomers";
import AddPromotion from "./assets/Admin-UI/components/addPromotion/addPromotion";
import Setting from "./assets/Admin-UI/components/setting/setting";
import Help from "./assets/Admin-UI/components/help/help";
import ForgotPassword from "./assets/Admin-UI/components/forgotPassword/forgotPassword";
import BackupRestore from "./assets/Admin-UI/components/backUp/backUp";
import DeliveryPage from "./assets/Customer-UI/pages/DeliveryPage";
import OrderPage from "./assets/Customer-UI/pages/OrderPage";
import axios from "axios";
function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState("admin");
 

  const adminRouter = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminUI />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "products",
          element: <Products />,
          children: [{ path: "addproduct", element: <AddProduct /> }],
        },
        { path: "orders", element: <Orders /> },
        {
          path: "customers",
          element: <Customers />,
          children: [{ path: "addcustomers", element: <AddCustomers /> }],
        },
        { path: "rating", element: <Rating /> },
        {
          path: "promotion",
          element: <Promotion />,
          children: [{ path: "addpromotion", element: <AddPromotion /> }],
        },
        { path: "reviews", element: <Reviews /> },
        { path: "quotes", element: <Quotes /> },
        { path: "setting", element: <Setting /> },
        { path: "backup", element: <BackupRestore /> },
        { path: "help", element: <Help /> },
        { path: "analytics", element: <Analytics /> },
      ],
    },
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/adminui",
      element: <AdminUI />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },

    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
      children: [],
    },
    {
      path: "/shopping-cart",
      element: <ShoppingCart />,
    },
    {
      path: "/edit-page",
      element: <ProfilePage />,
    },
    {
      path: "/productlist",
      element: <ProductList />,
    },
    {
      path: "/product/:id",
      element: <ProductDetails />,
    },
    {
      path: "/productwishlist",
      element: <ProductWishlist />, // Define route for ProductWishlist
    },
    {
      path: "/contactpage",
      element: <ContactPage />,
    },
    {
      path: "/aboutpage",
      element: <AboutPage />,
    },
    {
      path: "/billingpage",
      element: <BillingPage />,
    },
    {
      path: "/order-page",
      element: <OrderPage />,
    },

    {
      path: "/delivery-page",
      element: <DeliveryPage />,
    },
    {
      path: "/order-page",
      element: <OrderPage />,
    },
    {
      path: "/payment-page",
      // element: < />,
    },
  ]);

  // const customerRouter = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <HomePage />,
  //     errorElement: <ErrorPage />,
  //     children: [],
  //   },
  //   {
  //     path: "/shopping-cart",
  //     element: <ShoppingCart />,
  //   },
  //   {
  //     path: "/edit-page",
  //     element: <ProfilePage />,
  //   },
  //   {
  //     path: "/productlist",
  //     element: <ProductList />,
  //   },
  //   {
  //     path: "/product/:id",
  //     element: <ProductDetails />,
  //   },
  //   {
  //     path: "/productwishlist",
  //     element: <ProductWishlist />, // Define route for ProductWishlist
  //   },
  //   {
  //     path: "/contactpage",
  //     element: <ContactPage />,
  //   },
  //   {
  //     path: "/aboutpage",
  //     element: <AboutPage />,
  //   },
  //   {
  //     path: "/billingpage",
  //     element: <BillingPage />,
  //   },
  // ]);

  return (
    <>
      {user === "admin" && <RouterProvider router={adminRouter} />}
      {user === "customer" && <RouterProvider router={customerRouter} />}
      <ToastContainer />
    </>
  );
}

export default App;
