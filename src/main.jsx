import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WishlistProvider } from "./assets/Products/Context/WishlistContext";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
// const store = configureStore({
//   reducer: {
//     userInfo: userInfoReducer,
//     // Các reducers khác
//   },
// });
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <WishlistProvider>
        <App />
      </WishlistProvider>
    {/* </Provider> */}
  </React.StrictMode>
);
