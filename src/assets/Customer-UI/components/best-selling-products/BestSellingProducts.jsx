import React, { useState } from "react";
import Banter from "../TitleBanter";
import ViewAllButton from "../ViewAllButton";
import "./BestSellingProducts.css";
import Card from "../Card";
import SimpleSlider from "../Slider";
import CustomArrows from "../ArrowSlider";
import { Link } from "react-router-dom";
function BestSellingProducts({ products, ...props }) {
  const [viewAllProducts, setViewAllProducts] = useState(false);

  const onClickViewAllProducts = () => {
    setViewAllProducts(!viewAllProducts);
  };
  return (
    <div>
      <Banter title={"This month"} />
      <div className="flex text-left best-selling-products mb-14">
        <div>Best Selling Products</div>
        <div>
          <button
            onClick={() => {
              onClickViewAllProducts();
            }}
            className="view-all"
          >
            <Link to={"/productlist"}> View All</Link>
          </button>
        </div>
      </div>
      <CustomArrows products={products} viewAllProducts={viewAllProducts} />
    </div>
  );
}

export default BestSellingProducts;
