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
  const [dataReview, setDataReview ] = useState([])
  const [dataCart, setDataCart] = useState([]);
  const [dataUserName, setDataUserName] = useState([]);
  const [dataNewProduct, setNewDataProduct] = useState([]);
  const callApi = async () => {
    try {
      const response1 = await fetch("https://66bce56424da2de7ff6c2c3e.mockapi.io/reviews")
      const result1 = await response1.json();
      const response3 = await fetch("https://fakestoreapi.com/carts");
      const result3 = await response3.json();
      const response4 = await fetch(
        "https://66b0ab0f6a693a95b539b080.mockapi.io/users"
      );
      const result4 = await response4.json();
      const response5 = await fetch(
        "https://66b0ab0f6a693a95b539b080.mockapi.io/products"
      );
      const result5 = await response5.json();
      setDataReview(result1);
      setDataCart(result3);
      setDataUserName(result4);
      setNewDataProduct(result5);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);


  const updateDataNewUserName = (xxx) => {
    setDataUserName(xxx);
  };

  const newArrProduct = (xxx) => {
    setNewDataProduct(xxx);
  };

  const updatedArr = (xxx) => {
    setNewDataProduct(xxx)
  }

  return (
    <AdminContext.Provider
      value={{
        dataCart,
        dataUserName,
        updateDataNewUserName,
        dataNewProduct,
        newArrProduct,
        updatedArr,
        dataReview
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
const useAdminContext = () => useContext(AdminContext);
export { AdminProvider, useAdminContext };
