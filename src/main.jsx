import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WishlistProvider } from "./assets/Products/Context/WishlistContext";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1031104764261-5kcn6354nd1tai108r56gm38c9hqj0ec.apps.googleusercontent.com">
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);
