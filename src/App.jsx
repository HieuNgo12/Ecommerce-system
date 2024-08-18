import "./App.css";

import React, { useState } from "react";
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

// import AdminUI from "./assets/Admin-UI/AdminUI";
// import Dashboard from "./assets/Admin-UI/components/dashBoard/dashBoard";
// import Products from "./assets/Admin-UI/components/products/products";
// import Orders from "./assets/Admin-UI/components/orders/orders";
// import Customers from "./assets/Admin-UI/components/customers/customers";
// import Promotion from "./assets/Admin-UI/components/promotion/promotion";
// import Reviews from "./assets/Admin-UI/components/reviews/reviews";
// import LogIn from "./assets/Admin-UI/components/logIn/logIn_admin";
// import SignUp from "./assets/Admin-UI/components/signUp/signUp_admin";
// import Test from "./assets/Admin-UI/test";
// import AddProduct from "./assets/Admin-UI/components/addProduct/addProduct";
// import Analytics from "./assets/Admin-UI/components/analytics/analytics";
// import Quotes from "./assets/Admin-UI/components/analytics/analytics";
// import Rating from "./assets/Admin-UI/components/rating/rating";
function App() {
 
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState("customer");
   

  // const adminRouter = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <AdminUI />,
  //     errorElement: <ErrorPage />,
  //     children: [
  //       { path: "dashboard", element: <Dashboard /> },
  //       {
  //         path: "products",
  //         element: <Products />,
  //         children: [{ path: "addproduct", element: <AddProduct /> }],
  //       },
  //       { path: "orders", element: <Orders /> },
  //       { path: "customers", element: <Customers /> },
  //       { path: "rating", element: <Rating /> },
  //       {
  //         path: "promotion",
  //         element: <Promotion />,
  //         children: [[{ path: "addPromotion" }]],
  //       },
  //       { path: "reviews", element: <Reviews /> },
  //       { path: "analytics", element: <Analytics /> },
  //       { path: "quotes", element: <Quotes /> },
  //     ],
  //   },
  //   {
  //     path: "/login",
  //     element: <LogIn />,
  //   },
  //   {
  //     path: "/signup",
  //     element: <SignUp />,
  //   },
  //   {
  //     path: "/adminui",
  //     element: <AdminUI />,
  //   },
  //   {
  //     path: "/test",
  //     element: <Test />,
  //   },
  // ]);

  const customerRouter = createBrowserRouter([
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
  ]);



  return (
    <>
      {/* {user === "admin" && <RouterProvider router={adminRouter} />} */}
      {user === "customer" && <RouterProvider router={customerRouter} />}
    </>
  );
}

export default App;
