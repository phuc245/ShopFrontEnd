// src/components/ReviewList.tsx
import React from "react";
import { Review } from "@/types/review";
import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  reviews: Review[];
  onDelete?: (reviewId: string) => void;
  onEdit?: (review: Review) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  onDelete,
  onEdit,
}) => {
  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      ) : (
        <p>Chưa có đánh giá nào cho sản phẩm này.</p>
      )}
    </div>
  );
};

export default ReviewList;
