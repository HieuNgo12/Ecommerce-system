import React, { useState } from "react";
import Banter from "../TitleBanter";
import ViewAllButton from "../ViewAllButton";
import "./BestSellingProducts.css";
import Card from "../Card";
function BestSellingProducts({ products, ...props }) {
    const [viewAllProducts, setViewAllProducts] = useState (false);

    const onClickViewAllProducts = () => {
      setViewAllProducts(!viewAllProducts)
    };
  return (
    <div>
      <Banter title={"This month"} />
      <div className="flex text-left best-selling-products">
        <div>Best Selling Products</div>
        <div>
          <button onClick={()=>{onClickViewAllProducts()}} className="view-all">View All</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-10">
      { !viewAllProducts ? products.map((item, index) => {
          if (item.id > 0 && item.id < 5 ) {
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
        }) : products.map((item, index) => {
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
    </div>
  );
}

export default BestSellingProducts;
