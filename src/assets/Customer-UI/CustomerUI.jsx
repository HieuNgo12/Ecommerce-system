import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import FlashSales from "./components/flash-sales/FlashSales";
import BrowseByCategories from "./components/browse-by-categories/BrowseByCategories";
import BestSellingProducts from "./components/best-selling-products/BestSellingProducts";
import Categories from "./components/categories/Categories";
import ExploreOurProducts from "./components/explore-our-products/ExploreOurProducts";
import NewArrival from "./components/new-arrival/NewArrival";
import { Outlet } from 'react-router-dom';


function CustomerUI() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://fakestoreapi.com/products")
      const data = await res.json();
      setData(data)
    };
    getData();
    return () => {};
  }, []);

  return (
    <div className="md:w-max">
      <HomePage />
      <FlashSales products={data}/>
      <BrowseByCategories />
      <BestSellingProducts products={data}/>
      <Categories />
      <ExploreOurProducts products={data}/>
      <NewArrival />
      <Footer />
      <Outlet />
    </div>
  );
}

export default CustomerUI;
