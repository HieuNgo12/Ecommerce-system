import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Navbar from "../Customer-UI/components/Navbar";
import Footer from "../Customer-UI/components/Footer";
import { WishlistContext } from "./Context/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [relatedItems, setRelatedItems] = useState([]);
  const { addToWishlist } = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const images = [
    "/images/image 57.png",
    "/images/image 58.png",
    "/images/image 59.png",
    "/images/image 61.png",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    fetch(`https://66b0ab0f6a693a95b539b080.mockapi.io/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setCurrentImage(data.image);
        return fetch(
          `https://66b0ab0f6a693a95b539b080.mockapi.io/products?category=${data.category}`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        setRelatedItems(
          data.filter((item) => item.id !== parseInt(id)).slice(0, 4)
        );
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsInWishlist(wishlist.some((item) => item.id === parseInt(id)));
  }, [id]);

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.some((item) => item.id === product.id)) {
      alert("This item has already been added.");
    } else {
      addToWishlist(product);
      setIsInWishlist(true);
      alert("Item added to wishlist!");
    }
  };

  const handleAddToCart = () => {
    const cartList = JSON.parse(localStorage.getItem("cartList") || "[]");
    const newItem = {
      title: product.title,
      price: product.price,
      img: product.image,
      quantity: quantity,
    };

    for (let i = 0; i < quantity; i++) {
      cartList.push(newItem);
    }

    localStorage.setItem("cartList", JSON.stringify(cartList));
    alert("Product added to cart!");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="text-sm breadcrumbs mb-4">
          <ul className="flex flex-wrap items-center">
            <li>
              <Link to="/" className="text-gray-500 hover:underline">
                Products
              </Link>
            </li>
            {/* <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to="/gaming" className="text-gray-500 hover:underline">
                Gaming
              </Link>
            </li> */}
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 truncate max-w-xs">{product.title}</li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 flex gap-4">
            <div className="w-1/5 flex flex-col gap-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full aspect-square object-cover cursor-pointer border rounded"
                  onClick={() => setCurrentImage(img)}
                />
              ))}
            </div>
            <div className="w-4/5">
              <img
                src={currentImage || product.image}
                alt={product.title}
                className="w-full aspect-square object-contain rounded-lg border"
              />
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-sm ${
                    index < Math.round(product.rating.rate)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({product.rating.rate}) {product.rating.count} reviews
              </span>
            </div>
            <p className="text-3xl font-bold">${product.price}</p>
            <div className="max-h-40 overflow-y-auto pr-2">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* <div>
              <h2 className="font-semibold mb-2">Colours:</h2>
              <div className="flex gap-2">
                <button className="w-6 h-6 rounded-full bg-gray-200 border-2 border-gray-400"></button>
                <button className="w-6 h-6 rounded-full bg-red-500"></button>
              </div>
            </div> */}

            <div>
              <h2 className="font-semibold mb-2">Size:</h2>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md text-sm ${
                      selectedSize === size
                        ? "bg-red-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border rounded-md">
                <button
                  className="px-4 py-2 text-2xl font-bold"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  className="px-4 py-2 text-2xl font-bold"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="flex-grow bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition"
                onClick={handleAddToCart}
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`p-3 border rounded-md transition ${
                  isInWishlist ? "bg-red-500 text-white" : "hover:bg-gray-100"
                }`}
              >
                <FavoriteBorderIcon />
              </button>
            </div>

            <div className="space-y-4 mt-6">
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <h3 className="font-semibold">Free Delivery</h3>
                    <p className="text-sm text-gray-600">
                      Enter your postal code for Delivery Availability
                    </p>
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🔁</span>
                  <div>
                    <h3 className="font-semibold">Return Delivery</h3>
                    <p className="text-sm text-gray-600">
                      Free 30 Days Delivery Returns.{" "}
                      <span className="underline cursor-pointer">Details</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {relatedItems.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="block relative group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-contain"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -35%
                    </div>
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
                      <FavoriteBorderIcon />
                    </button>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-black px-4 py-2 rounded-full flex items-center">
                        <VisibilityIcon className="mr-2" />
                        Quick View
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-sm font-semibold mb-2 truncate">
                      {item.title}
                    </h2>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 text-sm">
                        {"★★★★☆"}
                      </div>
                      <span className="text-gray-500 text-xs ml-1">(75)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-600 font-bold">
                        ${item.price}
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        ${(item.price * 1.54).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add To Cart
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
