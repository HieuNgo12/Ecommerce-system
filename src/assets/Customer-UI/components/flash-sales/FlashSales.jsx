import React, { useEffect, useState } from "react";
import ViewAllButton from "../ViewAllButton";
import "./FlashSales.css";
import Banter from "../TitleBanter";
import Card from "../Card";
function FlashSales({ products, ...props }) {
  const [itemList, setItemList] = useState(products);
  const [viewAllProducts, setViewAllProducts] = useState(false);

  const onClickViewAllProducts = () => {
    setViewAllProducts(!viewAllProducts);
  };
  useEffect(() => {
    console.log(products);
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
            <p>Days</p>
            <p>Hours</p>
            <p>Minutes</p>
            <p>Seconds</p>
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
          <div className="grid grid-cols-4 gap-4">
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
          <ViewAllButton onClickViewAllProducts={onClickViewAllProducts}  title={"View All Products"} />
        </div>
      </div>
    </>
  );
}

export default FlashSales;
