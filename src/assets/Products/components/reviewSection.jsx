import { useState, useEffect } from 'react';
import { Rating } from '@mui/material';

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`);
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      const data = await response.json();
      if (data.success) {
        setReviews([...reviews, data.data]);
        setNewReview({ rating: 0, comment: '' });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <Rating
              name="rating"
              value={newReview.rating}
              onChange={(event, newValue) => {
                setNewReview({ ...newReview, rating: newValue });
              }}
            />
          </div>
          <div>
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Write your review here..."
            ></textarea>
          </div>
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
            Submit Review
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border p-4 rounded">
            <Rating name="read-only" value={review.rating} readOnly />
            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;