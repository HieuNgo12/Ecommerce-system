import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Navbar from "../Customer-UI/components/Navbar";
import Footer from "../Customer-UI/components/Footer";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    fetch("https://66b0ab0f6a693a95b539b080.mockapi.io/products")
      .then((response) => response.json())
      .then((data) => {
        const clothingItems = data.filter((product) => product.category);

        let expandedItems = [];
        while (expandedItems.length < 100) {
          expandedItems = [...expandedItems, ...clothingItems];
        }
        expandedItems = expandedItems.slice(0, 100); // Ensure exactly 100 items

        // Filter products based on search query
        const filtered = expandedItems.filter((product) =>
          product.title.toLowerCase().includes(searchQuery)
        );

        setProducts(expandedItems);
        setFilteredProducts(filtered.slice(0, itemsPerPage ));
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [searchQuery]); // Re-run when searchQuery changes

  const handlePageChange = (event, value) => {
    setPage(value);
    const startIndex = (value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredProducts(products.slice(startIndex, endIndex));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block relative group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain"
                  />
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
                    {product.title}
                  </h2>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                    <span className="text-gray-500 text-xs ml-1">(75)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-bold">${product.price}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Add To Cart
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Stack spacing={2} className="mt-8 flex justify-center items-center">
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
