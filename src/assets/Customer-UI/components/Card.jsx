import React, { useEffect, useState } from "react";
import "./Card.css";
import Stars from "./Stars";
import CustomArrows from "./ArrowSlider";
import SimpleSlider from "./Slider";
import Alert from "./utils/Alert";
import Loading from "./utils/Loading";
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [loading]);

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
      className="hover-product-card mt-12"
      style={{ backgroundImage: img, cursor: "pointer" }}
      onMouseEnter={(e) => {
        setHover(true);
      }}
      onMouseLeave={(e) => {
        setHover(false);
      }}
    >
      {/* {showSuccessAlert ? <Alert /> : null} */}

      <>
        <a class="flex sales-card block max-w-sm p-6 ">
          <div className="discount">
            {Math.round(
              ((price - (Number(price) + 99)) / (Number(price) + 99)) * 100
            ) + "%"}
          </div>
          <div>
            <img src={img} style={{ minWidth: "120px", height: "120px" }} />
          </div>
          <div className=" ">
            <img src="./icons/fill-heart.png" />
            <img src="./icons/fill-eye.png" />
          </div>
        </a>
        <div>
          <div>
            <div
              className="add-to-cart"
              onClick={() => {
                onClickCard();
                setLoading(true);
              }}
            >
              {loading ? <Loading /> : null}
            </div>
          </div>
        </div>

        <div className="text-left card-item">
          <p class="text-left card-title m-0 font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </p>
          <div className="flex">
            <div>
              <p className="price ">${price}</p>
            </div>
            <div>
              <p className="org-price line-through">${Number(price) + 99}</p>
            </div>
          </div>
          <div className="flex text-xl">
            {rating ? (
              <p class=" text-gray-700 dark:text-gray-400">
                <Stars stars={Math.round(rating)} />
              </p>
            ) : (
              "No Rating yet"
            )}
            <p className="rating">
              {"("} {review ? review : 0} {")"}
            </p>
          </div>
        </div>
      </>
    </div>
  );
}

export default Card;
