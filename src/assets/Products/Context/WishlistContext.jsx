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

  const removeFromWishlist = (id) => {
    setFavoriteItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(newItems));
      return newItems;
    });
  };

  const getWishlistCount = () => favoriteItems.length;

  return (
    <WishlistContext.Provider
      value={{ favoriteItems, addToWishlist, removeFromWishlist, getWishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
