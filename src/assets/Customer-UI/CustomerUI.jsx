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
import Loading from "./components/utils/Loading";

function CustomerUI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setData(data);
    };
    return () => {};
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [loading]);
  return (
    <div className="md:w-max">
      {loading ? (
        <Loading />
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
