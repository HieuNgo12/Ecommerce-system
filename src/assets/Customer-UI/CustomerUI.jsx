import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import FlashSales from "./components/flash-sales/FlashSales";
import BrowseByCategories from "./components/browse-by-categories/BrowseByCategories";
import BestSellingProducts from "./components/best-selling-products/BestSellingProducts";
import Categories from "./components/categories/Categories";
import ExploreOurProducts from "./components/explore-our-products/ExploreOurProducts";
import NewArrival from "./components/new-arrival/NewArrival";
import { Outlet } from "react-router-dom";

function CustomerUI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setData(data);
    };
    getData();
    return () => {};
  }, []);

  return (
    <div className="md:w-max">
      {loading ? (
        <div role="status" class="max-w-sm animate-pulse">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <HomePage />
          <FlashSales products={data} />
          <BrowseByCategories />
          <BestSellingProducts products={data} />
          <Categories />
          <ExploreOurProducts products={data} />
          <NewArrival />
          <Footer />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default CustomerUI;
