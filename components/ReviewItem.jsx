import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewItem = ({ review }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{review.course}</h3>
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`h-5 w-5 ${
              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="mt-2">{review.comment}</p>
      <p className="text-sm text-gray-600 mt-2">By {review.author}</p>
    </div>
  );
};

export default ReviewItem;
