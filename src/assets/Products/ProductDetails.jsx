import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Navbar from "../Customer-UI/components/Navbar";
import Footer from "../Customer-UI/components/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(2);
  const [relatedItems, setRelatedItems] = useState([]);

  const images = [
    "/images/image 57.png",
    "/images/image 58.png",
    "/images/image 59.png",
    "/images/image 61.png",
  ];

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setCurrentImage(data.image);
        return fetch(
          `https://fakestoreapi.com/products/category/${data.category}`
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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="text-sm breadcrumbs mb-8">
        <ul className="flex">
          <li>
            <a href="/" className="text-gray-500 hover:underline">
              Account
            </a>
          </li>
          <li>
            <a href="/gaming" className="text-gray-500 hover:underline">
              /Gaming
            </a>
          </li>
          <li className="text-gray-900">/{product.title}</li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-8">
          <div className="flex">
            <div className="w-1/5 pr-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full mb-4 cursor-pointer border rounded"
                  onClick={() => setCurrentImage(img)}
                />
              ))}
            </div>
            <div className="w-4/5">
              <img
                src={currentImage || product.image}
                alt={product.title}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">{"★★★★☆"}</div>
            <span className="ml-2 text-gray-600">(150 Reviews)</span>
            <span className="ml-4 text-green-500">In Stock</span>
          </div>
          <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
          <p className="text-xl text-gray-600">{product.description}</p>

          <div className="mb-6">
            <div className="flex space-x-2 jus flex-row">
              <h1 className="px-4 py-2 ">Size</h1>
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-red-500 text-white"
                      : "text-gray-700"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex items-center border rounded mr-4">
              <button
                className="px-3 py-1"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-3">{quantity}</span>
              <button
                className="px-3 py-1"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="bg-red-500 text-white px-8 py-2 rounded">
              Buy Now
            </button>
            <button className="ml-4 p-2 border rounded">
              <FavoriteBorder className="text-gray-500 hover:text-red-500 cursor-pointer" />
            </button>
          </div>

          <div className="border rounded p-4 mb-4">
            <h3 className="font-semibold mb-2">Free Delivery</h3>
            <p className="text-sm text-gray-600">
              Enter your postal code for Delivery Availability
            </p>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-semibold mb-2">Return Delivery</h3>
            <p className="text-sm text-gray-600">
              Free 30 Days Delivery Returns.{" "}
              <span className="underline">Details</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {relatedItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
              <p className="text-red-500 mb-4">-40%</p>
              <button className="w-full bg-black text-white py-2 rounded">
                Add To Cart
              </button>
              <button className="absolute top-2 right-2">
                <FavoriteBorder className="text-gray-500 hover:text-red-500 cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
