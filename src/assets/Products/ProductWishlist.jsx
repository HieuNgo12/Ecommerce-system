import { useContext } from "react";
import { WishlistContext } from "./Context/WishlistContext";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import Navbar from "../Customer-UI/components/Navbar";
import Footer from "../Customer-UI/components/Footer";
import ShoppingCart from "@mui/icons-material/ShoppingCart";


const ProductWishlist = () => {
  const { favoriteItems, removeFromWishlist } = useContext(WishlistContext);
  // const moveAllToBag = (item) => {
  //   // Add logic to move all items from wishlist to bag

  // }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between">
          <h1 className="text-3xl mb-6">Wishlist</h1>
          <button className="border rounded border-slate-600 mb-6 w-40">Move all to bag</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
            <div key={item.id} className="p-4 flex flex-col justify-between">
              <div className="relative p-4 border rounded-lg">
                <button
                  className="absolute top-3 right-3 bg-white rounded-full p-2"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <DeleteOutlinedIcon />
                </button>
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-60 h-48 object-contain"
                  />
                  <button className="w-full h-10 bg-black text-white rounded-lg flex items-center justify-center  hover:bg-gray-800 transition duration-300">
                  <ShoppingCart className="mr-2" /> Add To Cart
                </button>
                  <h2 className="text-xl font-semibold truncate pt-2">
                    {item.title}
                  </h2>
                  <p className="text-red-600 font-semibold">
                    ${item.price}
                  </p>

                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductWishlist;
