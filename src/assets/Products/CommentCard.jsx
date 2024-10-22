import React from "react";
import "./CommentCard.css";
function CommentCard() {
  return (
    <div className="comment-card ">
      <div className="flex text-left ">
        <div className="ml-6 flex">Annonymous rated <div className="text-green-300 ml-6 mr-6"> 5 stars </div> and </div>
        <div className="text-green-400 ml-6">commented</div>
      </div>
      <div className="text-yellow-400 ml-6 text-left">Very Good Product</div>

    </div>
  );
}

export default CommentCard;
