import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SellerUI from "./assets/Seller-UI/SellerUI";
import CustomerUI from "./assets/Customer-UI/CustomerUI";
import AdminUI from "./assets/Admin-UI/AdminUI";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import HomePage from "./assets/Customer-UI/pages/HomePage";
import ShoppingCart from "./assets/Customer-UI/pages/ShoppingCart";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("admin");
  const adminRouter = createBrowserRouter([
    {
      path: "/",
      element: <AdminUI />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "products",
          element: <Products />,
          children: [{ path: "addproduct", element: <AddProduct /> }],
        },
        { path: "orders", element: <Orders /> },
        { path: "customers", element: <Customers /> },
        { path: "rating", element: <Rating /> },
        { path: "promotion", element: <Promotion/>, children:[
          [{ path: "addPromotion",}]
        ]},
        { path: "reviews", element: <Reviews /> },
        { path: "analytics", element: <Analytics /> },
        { path: "quotes", element: <Quotes /> },
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
  ]);

  const customerRouter = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
      children: [
       

      ]
    },
    {
      path: "/shopping-cart",
      element: <ShoppingCart />,
    }, 
    {
      path: "/productlist",
      element: <ProductList />, // Define route for ProductList
    },
    {
      path: "/product/:id",
      element: <ProductDetails />, // Define route for ProductDetails
    },
    {
      path: "/productwishlist",
      element: <ProductWishlist />, // Define route for ProductWishlist
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
  );
}

export default App;
