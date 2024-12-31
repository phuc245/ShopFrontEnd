import React, { useEffect, useState } from "react";
import { reviewsApi } from "@/api/review-api";
import { Review } from "@/types/review";
import ReviewList from "@/components/manage-review/ReviewList";

const PageAdminReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Hàm lấy danh sách đánh giá từ server
  const fetchReviews = () => {
    reviewsApi
      .getAll()
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(
          "Lỗi khi lấy danh sách đánh giá:",
          error.response?.data || error
        );
      });
  };

  useEffect(() => {
    fetchReviews(); // Lấy danh sách đánh giá khi trang load
  }, []);

  const handleDeleteReview = (reviewId: string) => {
    reviewsApi
      .delete(reviewId)
      .then(() => {
        // Sau khi xóa thành công, gọi lại API để lấy lại danh sách đánh giá mới nhất
        fetchReviews();
        alert("Đánh giá đã được xóa!");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa đánh giá:", error.response?.data || error);
        alert("Đã có lỗi xảy ra khi xóa đánh giá!");
      });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Quản lý đánh giá</h1>
      <ReviewList reviews={reviews} onDelete={handleDeleteReview} />
    </div>
  );
};

export default PageAdminReview;
