import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { WishlistProvider } from './assets/Products/Context/WishlistContext'; 
import 'react-toastify/dist/ReactToastify.css'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </React.StrictMode>
);
