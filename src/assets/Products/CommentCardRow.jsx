import { Reviews } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import styled from "styled-components";

function CommentCardRow({ review, ...props }) {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  useEffect(() => {
    console.log(review);
  }, []);
  const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start
    margin-left: 32px;
    input[type="radio"] {
      display: none;
    }

    row-gap: 16px;
    padding: 12px 0px;

    .star {
      cursor: pointer;
      transition: color 200ms;
    }
  `;
  return (
    <div>
      <div className="relative p-6 flex-auto">
        <div className="comment-card   ">
          <div className="flex mt-4">
            <div className="ml-6 flex pr-10 ">
              Annonymous
              <Body>
                <div className="flex">
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;

                    return (
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value={review.rating}
                        />
                        <IoMdStar
                          key={i}
                          className="star"
                          size={20}
                          color={
                            ratingValue <= review.rating ? "#2B2073" : "#e4e5e9"
                          }
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              </Body>{" "}
            </div>
          </div>
          <div className=" mt-4 ml-6 flex pr-10 "> {review.comment}</div>
          <div className="flex">
            {review.image ? (
              <img
                src={review.image}
                style={{ width: "50px", height: "50px" }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCardRow;
