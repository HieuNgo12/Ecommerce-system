import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import FlashSales from "../components/flash-sales/FlashSales";
import BrowseByCategories from "../components/browse-by-categories/BrowseByCategories";
import BestSellingProducts from "../components/best-selling-products/BestSellingProducts";
import Categories from "../components/categories/Categories";
import ExploreOurProducts from "../components/explore-our-products/ExploreOurProducts";
import NewArrival from "../components/new-arrival/NewArrival";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SimpleSlider from "../components/Slider";
import CustomArrows from "../components/ArrowSlider";

function HomePage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://66b0ab0f6a693a95b539b080.mockapi.io/products");
      const data = await res.json();
      console.log(data);
      setData(data);
    };
    getData();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <FlashSales products={data} />
      <BrowseByCategories />
      <BestSellingProducts products={data} />
      <Categories />
      <ExploreOurProducts products={data} />
      <NewArrival />
      <Footer />
    </div>
  );
}

export default HomePage;
