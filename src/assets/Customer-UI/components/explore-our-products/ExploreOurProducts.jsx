import React, { useState } from "react";
import ViewAllButton from "../ViewAllButton";
import Card from "../Card";
import Banter from "../TitleBanter";
import CustomArrows from "../ArrowSlider";
import { Link } from "react-router-dom";

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

      <div className="grid grid-cols-4 gap-8">
        {!viewAllProducts
          ? products.map((item, index) => {
              if (item.id > 0 && item.id < 5) {
                return (
                  <div>
                    <Card
                      orgPrice={item.price + 99}
                      review={Math.ceil(item.rating.count)}
                      rating={item.rating.rate}
                      img={item.image}
                      price={item.price}
                      title={item.title}
                    />
                  </div>
                );
              }
            })
          : products.map((item, index) => {
              return (
                <div>
                  <Card
                    orgPrice={item.price + 99}
                    review={Math.ceil(item.rating.count)}
                    rating={item.rating.rate}
                    img={item.image}
                    price={item.price}
                    title={item.title}
                  />
                </div>
              );
            })}
      </div>
      <ViewAllButton
        title={"View All Products"}
        onClickViewAllProducts={onClickViewAllProducts}
      />

      <Link to="/productlist" className="text-blue-500 hover:underline">
        See all products
      </Link>
      <img className="mt-28 mb-20" src="./public/icons/line.png" />
    </div>
  );
}

export default ExploreOurProducts;
