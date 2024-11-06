import "./App.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCart from "./assets/Customer-UI/pages/ShoppingCart";
import ProductList from "./assets/Products/ProductList";
import ProductDetails from "./assets/Products/ProductDetails";
import ProductWishlist from "./assets/Products/ProductWishlist";
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
import HomePage from "./assets/Customer-UI/pages/HomePage";
import ErrorPage from "./assets/Customer-UI/pages/ErrorPage";
import ResetPassword from "./assets/Admin-UI/components/resetPassword/resetPassword";
import VerificationEmail from "./assets/Admin-UI/components/verificationEmail/verificationEmail";
import ProfilePageBody from "./assets/Customer-UI/components/edit-page/ProfilePageBody";
import Authorization from "./assets/Customer-UI/components/edit-page/Authorization";
import ChangePassword from "./assets/Customer-UI/components/edit-page/ChangePassword";
import ForgotPassword from "./assets/Admin-UI/components/forgotPassword/forgotPassword";
import AddPromotion from "./assets/Admin-UI/components/addPromotion/addPromotion";
import Setting from "./assets/Admin-UI/components/setting/setting";
import Help from "./assets/Admin-UI/components/help/help";
import BackupRestore from "./assets/Admin-UI/components/backUp/backUp";
import DeliveryPage from "./assets/Customer-UI/pages/DeliveryPage";
import OrderPage from "./assets/Customer-UI/pages/OrderPage";
import axios from "axios";
import Admin from "./assets/Admin-UI/components/admin/admin";
import MyOrder from "./assets/Customer-UI/components/edit-page/MyOrder";
// import MyPayment from "../components/edit-page/PaymentMethod";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState("customer");

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
        {
          path: "admin",
          element: <Admin />,
          children: [{ path: "addAdmin", element: <AddCustomers /> }],
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
      path: "/test",
      element: <Test />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
      children: [
        { path: "my-profile", element: <ProfilePageBody /> },
        { path: "my-authorization", element: <Authorization /> },
        { path: "my-password", element: <ChangePassword /> },
        { path: "my-order", element: <MyOrder /> },
        // { path: "my-payment", element: <MyPayment /> },
      ],
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/verification-email",
      element: <VerificationEmail />,
    },
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
      children: [],
    },
  ]);

  const customerRouter = createBrowserRouter([
    // {
    //   path: "/shopping-cart",
    //   element: <ShoppingCart />,
    // },
    {
      path: "/edit-page",
      element: <ProfilePage />,
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
    // {
    //   path: "/productlist",
    //   element: <ProductList />,
    // },
    // {
    //   path: "/product/:id",
    //   element: <ProductDetails />,
    // },
    // {
    //   path: "/productwishlist",
    //   element: <ProductWishlist />, // Define route for ProductWishlist
    // },
    // {
    //   path: "/contactpage",
    //   element: <ContactPage />,
    // },
    // {
    //   path: "/aboutpage",
    //   element: <AboutPage />,
    // },
    // {
    //   path: "/billingpage",
    //   element: <BillingPage />,
    // },
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
