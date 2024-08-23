import React from "react";
import Slider from "react-slick";
import Card from "./Card";

export default function SimpleSlider(
  orgPrice,
  review,
  rating,
  img,
  price,
  title
) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
        {}
      <div>
        <Card
          orgPrice={item.price + 99}
          review={Math.ceil(item.rating.count)}
          rating={item.rating.rate}
          img={item.image}
          price={item.price}
          title={item.title}
        />{" "}
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}
