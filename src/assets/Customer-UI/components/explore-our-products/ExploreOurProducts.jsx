import React, { useState } from "react";
import ViewAllButton from "../ViewAllButton";
import Card from "../Card";
import Banter from "../TitleBanter";
import CustomArrows from "../ArrowSlider";

function ExploreOurProducts({ products, ...props }) {
  const [viewAllProducts, setViewAllProducts] = useState(false);

  const onClickViewAllProducts = () => {
    setViewAllProducts(!viewAllProducts);
  };
  return (
    <div>
      <Banter title={"Our Products"} />
      <div>
        <h1 className="text-left">Explore Our Products</h1>
      </div>
      <CustomArrows products={products} viewAllProducts={viewAllProducts} />

      <ViewAllButton
        title={"View All Products"}
        onClickViewAllProducts={onClickViewAllProducts}
      />

      <img className="mt-28 mb-20" src="./public/icons/line.png" />
    </div>
  );
}

export default ExploreOurProducts;
