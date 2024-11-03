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
import axios from "axios";

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("token");
      const user = await axios.post(
        "http://localhost:8080/api/v1/auth/getUserByToken",
        {
          token: token,
        }
      );
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user.data.data));
    }
    getUser();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8080/api/v1/products`);
      const responseJson = await res.json();
      const data = responseJson.data.map((productData) => {
        console.log(productData);
        return {
          category: productData.category,
          title: productData.title,
          image: productData.image,
          description: productData.description,
          price: productData.price,
          rating: {
            rate: productData.rating?.rate || 3.9,
            count: 120,
          },
          status: productData.status,
          id: productData._id,
        };
      });
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
