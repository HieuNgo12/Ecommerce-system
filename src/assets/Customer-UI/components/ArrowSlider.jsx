import React, { Component } from "react";
import Slider from "react-slick";
import Card from "./Card";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
    <img src="./public/icons/browse-by-categories/right-arrow.png" />
  </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <img src="./public/icons/browse-by-categories/left-arrow.png" />
    </div>
  );
}

function CustomArrows({ viewAllProducts, products, ...props }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        { products?.length &&
          products.map((item, index) => {
            console.log(item);
                return (
                  <div>
                    <Card
                      orgPrice={item?.price + 99}
                      review={Math.ceil(item?.rating[0]?.count)}
                      rating={item?.rating[1]?.rate}
                      img={item?.image}
                      price={item?.price}
                      title={item?.title}
                    />
                  </div>
                );
              
            })}
      </Slider>
    </div>
  );
}

export default CustomArrows;
