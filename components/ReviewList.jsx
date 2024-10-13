import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = () => {
  // This is a placeholder. In a real application, you'd fetch reviews from an API or database
  const reviews = [
    { id: 1, course: 'Mathematics', rating: 4, comment: 'Great course!', author: 'John Doe' },
    { id: 2, course: 'Physics', rating: 5, comment: 'Excellent content and teaching', author: 'Jane Smith' },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Recent Reviews</h2>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
