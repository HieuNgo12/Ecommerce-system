import axios from "axios";
import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import styled from "styled-components";

function FiveStar() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    input[type="radio"] {
      display: none;
    }
    .star {
      cursor: pointer;
      transition: color 200ms;
    }
  `;

  return (
    <div>
      <Body>
        <label>
          <div className="flex">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;

              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <IoMdStar
                    key={i}
                    className="star"
                    size={20}
                    color={
                      ratingValue <= (hover || rating) ? "#2B2073" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
          <div className="mt-6">
        
          </div>
        </label>{" "}
   
        {/* <p>Rating is: {rating}</p> */}
      </Body>
      <input
              style={{
                border: "1px solid black",
                borderRadius: "4px",
                height: "200px",
                width: "400px",
                marginTop: "6px",
              }}
              className="comment-box ml-6"
              placeholder="Comment"
              // value={comment}
              onChange={(e) => {
                console.log(e);
                setComment(e.target.value);
              }}
            />
                 <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            const res = await axios.post("http://localhost:8080/");
          }}
        >
          Post Comment
        </button>
    </div>
  );
}

export default FiveStar;
