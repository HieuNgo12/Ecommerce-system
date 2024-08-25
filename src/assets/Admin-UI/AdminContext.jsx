import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { Navigate } from "react-router-dom";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [dataReview, setDataReview] = useState([]);
  // const [dataCart, setDataCart] = useState([]);
  const [dataUserName, setDataUserName] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataQuotes, setDataQuotes] = useState([]);
  const [dataPromotion, setDataPromotion] = useState([]);
  const callApi = async () => {
    try {
      const response1 = await fetch(
        "https://66bce56424da2de7ff6c2c3e.mockapi.io/reviews"
      );
      const result1 = await response1.json();
      const response2 = await fetch("https://dummyjson.com/quotes");
      const result2 = await response2.json();
      const getQuotes = result2.quotes;
      // const response3 = await fetch("https://fakestoreapi.com/carts");
      // const result3 = await response3.json();
      const response4 = await fetch(
        "https://66b0ab0f6a693a95b539b080.mockapi.io/users"
      );
      const result4 = await response4.json();
      const response5 = await fetch(
        "https://66b0ab0f6a693a95b539b080.mockapi.io/products"
      );
      const result5 = await response5.json();
      setDataReview(result1);
      setDataQuotes(getQuotes);
      // setDataCart(result3);
      setDataUserName(result4);
      setDataProduct(result5);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const newPromotion = (xxx) => {
    setDataPromotion(xxx);
  };

  return (
    <AdminContext.Provider
      value={{
        callApi,
        // dataCart,
        dataUserName,
        dataProduct,
        dataReview,
        dataQuotes,
        newPromotion,
        dataPromotion,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
const useAdminContext = () => useContext(AdminContext);
export { AdminProvider, useAdminContext };
