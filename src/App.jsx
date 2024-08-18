import { useState } from "react";
import "./App.css";
import SellerUI from "./assets/Seller-UI/SellerUI";
import AdminUI from "./assets/Admin-UI/AdminUI";
import ProductList from "./assets/Products/ProductList";
import ProductDetails from "./assets/Products/ProductDetails";
import ProductWishlist from "./assets/Products/ProductWishlist";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./assets/Customer-UI/pages/ErrorPage";
import HomePage from "./assets/Customer-UI/pages/HomePage";
import ShoppingCart from "./assets/Customer-UI/pages/ShoppingCart";
import ErrorPage from "./assets/Customer-UI/pages/ErrorPage";
import ProductList from "./assets/Products/ProductList";
import ProductDetails from "./assets/Products/ProductDetails";
import ProductWishlist from "./assets/Products/ProductWishlist";

function App() {
  const [user, setUser] = useState("customer");
  const adminRouter = createBrowserRouter([
    {
      path: "/",
      element: <AdminUI />,
<<<<<<< Updated upstream
=======
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
        {
          path: "promotion",
          element: <Promotion />,
          children: [[{ path: "addPromotion" }]],
        },
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
>>>>>>> Stashed changes
    },
  ]);

  const customerRouter = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
<<<<<<< Updated upstream
      errorElement: <ErrorPage/>,
=======
      errorElement: <ErrorPage />,
>>>>>>> Stashed changes
      children: [],
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
