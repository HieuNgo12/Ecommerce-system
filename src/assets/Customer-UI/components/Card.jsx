import React from "react";
import "./Card.css"
import Stars from "./Stars";
function Card({ onClickViewAllProducts, price, orgPrice, title, rating, img, review, ...props }) {
  return (
    <div 
    style={{backgroundImage: img, cursor: "pointer"}}

    >
      <a class="flex sales-card block max-w-sm p-6 ">
        <div className="discount">
          -40%
        </div>
        <div>
          <img src={img} style={{ marginLeft: "15%", height: "120px" }} />
        </div>
        <div className="ml-20 ">
          <img src="./icons/fill-heart.png" />
          <img src="./icons/fill-eye.png" />
        </div>
      </a>
      <div className="text-left">
        <p class="text-left text-2xl m-0 font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </p>
        <div className="flex">
          <p className="price p-0">${price}</p>
          <p className="org-price line-through">${orgPrice}</p>
        </div>
        <div className="flex">

        <p class="font-normal text-gray-700 dark:text-gray-400">
          <Stars stars={Math.round(rating)} />
        </p>
        <p className="rating">
          {"("}  {review}  {")"}
        </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
