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

function CustomArrows({ Products, products, ...props }) {
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
                return (
                  <div>
                    <Card
                      orgPrice={item?.price}
                      review={Math.ceil(item?.rating?.count)}
                      rating={item?.rating?.rate}
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
