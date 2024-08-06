import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Navbar from "../Customer-UI/components/Navbar";
import Footer from "../Customer-UI/components/Footer";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const clothingItems = data.filter((product) => product.category);

        let expandedItems = [];
        while (expandedItems.length < 100) {
          expandedItems = [...expandedItems, ...clothingItems];
        }
        expandedItems = expandedItems.slice(0, 100); // Ensure exactly 100 items

        setProducts(expandedItems);
        setFilteredProducts(expandedItems.slice(0, itemsPerPage));
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
    const startIndex = (value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredProducts(products.slice(startIndex, endIndex));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex justify-center"
            >
              <div className="p-4 flex flex-col relative">
                <div className="absolute top right-6 bg-white rounded-full">
                  <FavoriteBorder className="text-gray-500 hover:text-red-500 cursor-pointer" />
                </div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-60 h-48 object-contain border rounded-lg p-4 flex flex-col "
                />
                <button className="w-full h-10 bg-black text-white p-4 rounded-lg flex items-center justify-center  hover:bg-gray-800 transition duration-300">
                  <ShoppingCart className="mr-2" /> Add To Cart
                </button>
                <h2
                  className="text-xl font-semibold truncate w-full pt-2"
                  style={{ maxWidth: "200px" }}
                >
                  {product.title}
                </h2>
                <p className="text-red-600 font-semibold">
                  ${product.price} USD
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Stack spacing={2} className="mt-4 flex justify-center items-center">
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            className="mx-auto"
          />
        </Stack>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
