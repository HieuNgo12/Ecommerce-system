import React, { useEffect, useState } from "react";
import ViewAllButton from "../ViewAllButton";
import "./FlashSales.css";
import Banter from "../TitleBanter";
import Card from "../Card";
import CustomArrows from "../ArrowSlider";
function FlashSales({ products, ...props }) {
  const [itemList, setItemList] = useState(products);
  const [viewAllProducts, setViewAllProducts] = useState(false);

  const onClickViewAllProducts = () => {
    setViewAllProducts(!viewAllProducts);
  };
  useEffect(() => {
    // const productsList = products.map((product) => {
    //   return {
    //     title: product.title,
    //     img: product.image,
    //     price: product.price,
    //     orgPrice: product.price + 99,
    //     rating: product.rating.rate,
    //     review: product.rating.count,
    //   };
    // });
    // setItemList(productsList);

    // return () => {};
  }, []);
  return (
    <>
      <div>
        <Banter title={"Today's"} />

        <div className="flex grid grid-cols-4 gap-4">
          <div>{""}</div>
          <div className="flex time-title">
            <p className="time-text">Days</p>
            <p className="time-text">Hours</p>
            <p className="time-text">Minutes</p>
            <p className="time-text">Seconds</p>
          </div>
        </div>
        <div className="flex grid grid-cols-4 gap-4">
          <div>
            <h1 className="flash-sales">Flash Sales</h1>
          </div>

          <div className="flex time">
            <p>03:</p>
            <p>23:</p>
            <p>19:</p>
            <p>56</p>
          </div>
        </div>
        <div>
          <CustomArrows products={products} viewAllProducts={viewAllProducts} />

          <ViewAllButton
            onClickViewAllProducts={onClickViewAllProducts}
            title={"View All Products"}
          />
        </div>
      </div>
    </>
  );
}

export default FlashSales;
