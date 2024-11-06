import React, { useEffect } from "react";
import "./CommentCard.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentCardRow from "./CommentCardRow";

function CommentCard() {
  const [showModal, setShowModal] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [filterByStar, setFilterByStar] = React.useState(0);
  const [originalReviewList, setOriginalReviewList] = React.useState([]);

  const { id } = useParams();
  const getReviews = async () => {
    console.log(localStorage.getItem("user"));
    const data = await axios.post("http://localhost:8080/api/v1/getReviews", {
      userEmail: JSON.parse(localStorage.getItem("user"))?.email,
      productId: id,
    });
    const reviews = data.data.data;
    setReviews(reviews);
    setOriginalReviewList(reviews);
  };
  useEffect(() => {
    getReviews();
    return () => {};
  }, []);
  useEffect(() => {
    console.log(reviews);
    if (!isNaN(Number(filterByStar))) {
      const newReviewList = originalReviewList.filter((review) => {
        return Number(review.rating) === Number(filterByStar);
      });
      setReviews(newReviewList);
    } else {
      console.log(originalReviewList);
      setReviews(originalReviewList);
    }
  }, [filterByStar]);
  return (
    <>
      <button
        className=" bg-pink-500 ml-10 text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        View Reviews
      </button>

      {showModal ? (
        <>
          <div className=" flex fixed inset-0 z-50 overflow-y-auto overflow-x-hidden ">
            <div className=" relative w-auto my-6  max-w-3xl">
              {/*content*/}
              <div className="view-comment-box  show-modal border-0 rounded-lg shaddow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t ">
                  <h3 className="text-3xl font-semibold ">View comments</h3>
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
                <form class="max-w-sm mx-auto">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setFilterByStar(Number(e.target.value));
                    }}
                  >
                    <option value="all" selected>
                      Reviews
                    </option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Star</option>
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                  </select>
                </form>
                {reviews.length
                  ? reviews.map((review) => {
                      return <CommentCardRow review={review} />;
                    })
                  : null}

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={async () => {
                      setShowModal(false);
                    }}
                  >
                    Save Changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default CommentCard;
