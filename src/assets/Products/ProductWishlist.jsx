// import { useContext } from "react";
// import { WishlistContext } from "./Context/WishlistContext";
// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import { Link } from "react-router-dom";
// import Navbar from "../Customer-UI/components/Navbar";
// import Footer from "../Customer-UI/components/Footer";
// import ShoppingCart from "@mui/icons-material/ShoppingCart";


// const ProductWishlist = () => {
//   const { favoriteItems, removeFromWishlist } = useContext(WishlistContext);
//   // const moveAllToBag = (item) => {
//   //   // Add logic to move all items from wishlist to bag

//   // }

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-between">
//           <h1 className="text-3xl mb-6">Wishlist</h1>
//           <button className="border rounded border-slate-600 mb-6 w-40">Move all to bag</button>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {favoriteItems.map((item) => (
//             <div key={item.id} className="p-4 flex flex-col justify-between">
//               <div className="relative p-4 border rounded-lg">
//                 <button
//                   className="absolute top-3 right-3 bg-white rounded-full p-2"
//                   onClick={() => removeFromWishlist(item.id)}
//                 >
//                   <DeleteOutlinedIcon />
//                 </button>
//                 <Link to={`/product/${item.id}`}>
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-60 h-48 object-contain"
//                   />
//                   <button className="w-full h-10 bg-black text-white rounded-lg flex items-center justify-center  hover:bg-gray-800 transition duration-300">
//                   <ShoppingCart className="mr-2" /> Add To Cart
//                 </button>
//                   <h2 className="text-xl font-semibold truncate pt-2">
//                     {item.title}
//                   </h2>
//                   <p className="text-red-600 font-semibold">
//                     ${item.price}
//                   </p>

//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductWishlist;

import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "./Context/WishlistContext";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import Navbar from "../Customer-UI/components/Navbar";
import Footer from "../Customer-UI/components/Footer";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

const ProductWishlist = () => {
  const { favoriteItems, removeFromWishlist } = useContext(WishlistContext);
  const [justForYouItems, setJustForYouItems] = useState([]);

  useEffect(() => {
    const fetchJustForYouItems = async () => {
      try {
        const response = await fetch('https://66b0ab0f6a693a95b539b080.mockapi.io/products');
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

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Wishlist ({favoriteItems.length})</h1>
          <button className="bg-white text-black border border-gray-300 px-4 py-2 rounded">
            Move All To Bag
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {favoriteItems.map((item) => (
            <div key={item.id} className="bg-white p-4 relative">
              {item.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{item.discount}%
                </span>
              )}
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => removeFromWishlist(item.id)}
              >
                <DeleteOutlinedIcon />
              </button>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-sm font-semibold mb-2">{item.title}</h2>
              <p className="text-red-600 font-semibold mb-2">${item.price}</p>
              {item.originalPrice && (
                <p className="text-gray-500 line-through text-sm">${item.originalPrice}</p>
              )}
              <button className="w-full bg-black text-white py-2 mt-2 rounded flex items-center justify-center">
                <ShoppingCart className="mr-2" /> Add To Cart
              </button>
            </div>
          ))}
        </div>
        
        {favoriteItems.length > 0 && justForYouItems.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Just For You</h2>
              <button className="text-black">See All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {justForYouItems.map((item) => (
                <div key={item.id} className="bg-white p-4 relative">
                  {item.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      -{item.discount}%
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h2 className="text-sm font-semibold mb-2">{item.title}</h2>
                  <p className="text-red-600 font-semibold mb-2">${item.price}</p>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-gray-500 ml-1">(65)</span>
                  </div>
                  <button className="w-full bg-black text-white py-2 mt-2 rounded flex items-center justify-center">
                    <ShoppingCart className="mr-2" /> Add To Cart
                  </button>
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