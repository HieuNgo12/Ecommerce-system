import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "./Context/WishlistContext";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import Navbar from "../Customer-UI/components/Navbar";
import Footer from "../Customer-UI/components/Footer";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const ProductWishlist = () => {
  const { favoriteItems, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);
  const [justForYouItems, setJustForYouItems] = useState([]);

  useEffect(() => {
    const fetchJustForYouItems = async () => {
      try {
        const response = await fetch(
          "https://66b0ab0f6a693a95b539b080.mockapi.io/products"
        );
        const data = await response.json();
        setJustForYouItems(data.slice(0, 4)); // Get first 4 items
      } catch (error) {
        console.error("Error fetching Just For You items:", error);
      }
    };

    if (favoriteItems.length > 0) {
      fetchJustForYouItems();
    }
  }, [favoriteItems]);

  const handleAddToCart = (favoriteItems) => {
    const cartList = JSON.parse(localStorage.getItem("cartList") || "[]");
    const quantity = 1; // Define quantity here
    const newItem = {
      title: favoriteItems.title,
      price: favoriteItems.price,
      img: favoriteItems.image,
      quantity: quantity,
    };

    for (let i = 0; i < quantity; i++) {
      cartList.push(newItem);
    }

    localStorage.setItem("cartList", JSON.stringify(cartList));
    alert("Product added to cart!");
  };

  const moveAllToCart = () => {
    const cartList = JSON.parse(localStorage.getItem("cartList") || "[]");

    favoriteItems.forEach((item) => {
      const quantity = 1; // Define quantity here
      const newItem = {
        title: item.title,
        price: item.price,
        img: item.image,
        quantity: quantity,
      };

      for (let i = 0; i < quantity; i++) {
        cartList.push(newItem);
      }
    });

    localStorage.setItem("cartList", JSON.stringify(cartList));
    clearWishlist(); // Clear the wishlist after moving all items to the cart
    alert("All items moved to cart!");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-28 my-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            Wishlist ({favoriteItems.length})
          </h1>
          {favoriteItems.length > 0 && (
            <button
              className="bg-white text-black border border-gray-300 px-4 py-2 rounded font-bold hover:border-black"
              onClick={moveAllToCart}
            >
              Move All To Bag
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {favoriteItems.map((item) => (
            <div key={item.id} className=" p-4 relative rounded-lg">
              <div className="bg-grey-500 shadow-lg">
                <button
                  className="absolute top-6 right-8 text-gray-500 hover:text-gray-700"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <DeleteOutlinedIcon />
                </button>
                {/* Link to product details page */}
                <Link to={`/product/${item.id}`} className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-contain mb-4 rounded-md"
                  />
                </Link>

                <button
                  className="w-full bg-black text-white py-2 mt-2 rounded-md flex items-center justify-center hover:bg-gray-800"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart className="mr-2" /> Add To Cart
                </button>
              </div>
              <h2 className="font-semibold my-2 text-left text-lg">
                {item.title}
              </h2>
              <h6 className="text-red-600 mb-2 text-left text-base">
                ${item.price}
              </h6>
            </div>
          ))}
        </div>

        {favoriteItems.length > 0 && justForYouItems.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Just For You</h2>
              <Link to="/productlist">
                {" "}
                <button className="bg-white text-black border border-gray-300 px-4 py-2 rounded font-bold hover:border-black">
                  See All
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {justForYouItems.map((item) => (
                <div key={item.id} className="bg-white p-4 relative">
                  <div className="bg-grey-500 shadow-lg">
                    <button className="absolute top-6 right-8 text-gray-500 hover:text-gray-700">
                      <VisibilityOutlinedIcon />
                    </button>
                    <Link to={`/product/${item.id}`} className="block">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-contain mb-4"
                      />
                    </Link>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-black text-white py-2 mt-2 rounded flex items-center justify-center"
                    >
                      <ShoppingCart className="mr-2" /> Add To Cart
                    </button>
                  </div>
                  <h2 className="font-semibold my-2 text-left text-lg">
                    {item.title}
                  </h2>
                  <h6 className="text-red-600 mb-2 text-left text-base">
                    ${item.price}
                  </h6>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-sm ${
                          index < Math.round(item.rating?.rate)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({item.rating?.rate}) {item.rating?.count} reviews
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductWishlist;
