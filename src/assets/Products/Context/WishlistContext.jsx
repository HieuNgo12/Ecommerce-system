import { createContext, useState } from "react";

export const WishlistContext = createContext();

// eslint-disable-next-line react/prop-types
export const WishlistProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState(() => {
    // Initialize from localStorage
    const savedItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    return savedItems;
  });

  const addToWishlist = (item) => {
    setFavoriteItems((prevItems) => {
      const newItems = [...prevItems, item];
      localStorage.setItem("wishlist", JSON.stringify(newItems));
      return newItems;
    });
  };



  //remove an item from the wishlist by its ID
  const removeFromWishlist = (id) => {
    setFavoriteItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(newItems));
      return newItems;
    });
  };

  //clear all items from the wishlist
  const clearWishlist = () => {
    setFavoriteItems([]);
    localStorage.removeItem("wishlist");
  };

  const getWishlistCount = () => favoriteItems.length;

  return (
    <WishlistContext.Provider
      value={{ favoriteItems, addToWishlist, removeFromWishlist, getWishlistCount, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
