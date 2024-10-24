import axios from "axios";
import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import styled from "styled-components";
import { Button, Modal } from "flowbite-react";
import "./FiveStar.css";
function FiveStar() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(true);

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
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          setModal(true);
          const res = await axios.post("http://localhost:8080/api/v1/reviews", {
            product: "123",
            user: "123",
            comment: comment,
            rating: rating,
            image: null,
          });
        }}
      >
        Write a review
      </button>
      <>
        {modal ? (
          <>
            <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className=" review-modal border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Review Comment</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <Body>
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
                                ratingValue <= (hover || rating)
                                  ? "#2B2073"
                                  : "#e4e5e9"
                              }
                              onMouseEnter={() => setHover(ratingValue)}
                              onMouseLeave={() => setHover(null)}
                            />
                          </label>
                        );
                      })}
                    </div>
                    {/* <p>Rating is: {rating}</p> */}

                    <textarea
                      style={{
                        border: "1px solid black",
                        borderRadius: "4px",
                        height: "200px",
                        width: "80%",
                        paddingLeft: "4px",
                        paddingTop: "4px",
                        marginTop: "6px",
                        marginLeft: 0,
                      }}
                      className="comment-box ml-6"
                      placeholder="Comment"
                      // value={comment}
                      onChange={(e) => {
                        console.log(e);
                        setComment(e.target.value);
                      }}
                    />

                    <div>
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
                        for="file_input"
                      >
                        Upload Image
                      </label>
                      <input
                        // style={{ display: "none" }}
                        class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
                        id="file_input"
                        type="file"
                      />
                    </div>
                  </Body>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={async () => {
                        setModal(false);
                        await axios.post(
                          "http://localhost:8080/api/v1/reviews"
                        );
                      }}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </div>
  );
}

export default FiveStar;
