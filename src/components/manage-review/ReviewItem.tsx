// src/components/ReviewItem.tsx
import React from "react";
import { Review } from "@/types/review";
import { Button } from "@/components/ui/button";
import { FaRegUserCircle } from "react-icons/fa";

interface ReviewItemProps {
  review: Review;
  onDelete?: (reviewId: string) => void;
  onEdit?: (review: Review) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="border-b py-4 flex items-center gap-4">
      <FaRegUserCircle className="w-12 h-12 text-gray-500" />
      <div>
        <p className="font-semibold">{review.user_id.name}</p>
        <p className="text-gray-600">{review.content}</p>
        <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
        <div className="flex gap-4 mt-2">
          {onEdit && (
            <Button
              onClick={() => onEdit(review)}
              className="text-blue-500 underline bg-transparent hover:text-blue-600"
            >
              Sửa
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={() => onDelete(review._id)}
              className="text-red-500 underline bg-transparent hover:text-red-600"
            >
              Xóa
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
