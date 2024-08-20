import React, { useEffect, useState } from "react";
import "./Card.css";
import Stars from "./Stars";
import CustomArrows from "./ArrowSlider";
import SimpleSlider from "./Slider";
import Alert from "./utils/Alert";
function Card({
  onClickViewAllProducts,
  price,
  orgPrice,
  title,
  rating,
  img,
  review,
  ...props
}) {
  const [hover, setHover] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [showSuccessAlert]);

  const onClickCard = () => {
    const savedList = JSON?.parse(localStorage?.getItem("cartList")) || [];
    savedList.push({
      onClickViewAllProducts,
      price,
      orgPrice,
      title,
      rating,
      img,
      review,
    });
    localStorage.setItem("cartList", JSON.stringify(savedList));
    setShowSuccessAlert(true);
  };
  return (
    <div
      className="hover-product-card"
      style={{ backgroundImage: img, cursor: "pointer" }}
      onMouseEnter={(e) => {
        setHover(true);
      }}
      onMouseLeave={(e) => {
        setHover(false);
      }}
    >
      {showSuccessAlert ? <Alert /> : null}
      <a class="flex sales-card block max-w-sm p-6 ">
        <div className="discount">
          {Math.round(((price - (Number(price) + 99)) / (Number(price) + 99)) * 100) + "%"}
        </div>
        <div>
          <img src={img} style={{ marginLeft: "15%", height: "120px" }} />
        </div>
        <div className="ml-20 ">
          <img src="./icons/fill-heart.png" />
          <img src="./icons/fill-eye.png" />
        </div>
      </a>
      <div>
        {hover && (
          <div
            className="add-to-cart"

            onClick={() => {
              onClickCard();
            }}
          >
        
            Add to Cart
          </div>
        )}
      </div>

      <div className="text-left">
        <p class="text-left text-2xl m-0 font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </p>
        <div className="flex">
          <p className="price p-0">${price}</p>
          <p className="org-price line-through">${Number(price) + 99}</p>
        </div>
        <div className="flex text-xl md:shrink-0">
          {rating ? <p class="font-normal text-gray-700 dark:text-gray-400">
            <Stars stars={Math.round(rating)} />
          </p> : "No Rating yet"}
          <p className="rating">
            {"("} {review ? review : 0} {")"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
