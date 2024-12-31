// src/components/ReviewForm.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ReviewFormProps {
  initialContent?: string;
  initialRating?: number;
  onSubmit: (content: string, rating: number) => void;
  onCancel?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  initialContent = "",
  initialRating = 5,
  onSubmit,
  onCancel,
}) => {
  const [content, setContent] = useState(initialContent);
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setContent(initialContent);
    setRating(initialRating);
  }, [initialContent, initialRating]);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content, rating);
    } else {
      alert("Vui lòng nhập nội dung đánh giá!");
    }
  };

  return (
    <div className="mt-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nhập nội dung đánh giá..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <div className="mt-4">
        <span className="font-semibold">Điểm đánh giá:</span>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="ml-2 p-2 border border-gray-300 rounded-md"
        >
          <option value={1}>1 sao</option>
          <option value={2}>2 sao</option>
          <option value={3}>3 sao</option>
          <option value={4}>4 sao</option>
          <option value={5}>5 sao</option>
        </select>
      </div>
      <div className="flex gap-4 mt-4">
        <Button onClick={handleSubmit} className="bg-blue-500 text-white">
          Lưu
        </Button>
        {onCancel && (
          <Button
            onClick={onCancel}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Hủy
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
