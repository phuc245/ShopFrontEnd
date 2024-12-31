import { useState, useEffect } from "react";
import axiosClient from "@/api/axios-cilent";
import { CreateReviewDto, Review, UpdateReviewDto } from "@/types/review";

export const useReviews = (product_id: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const client = axiosClient(false); // Không cần redirect
      const { data } = await client.get(`/reviews/product/${product_id}`);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (reviewData: CreateReviewDto) => {
    try {
      const client = axiosClient(true); // Có thể cần redirect nếu lỗi 401
      const { data } = await client.post("/reviews", reviewData);
      setReviews((prev) => [...prev, data]); // Thêm review mới vào state
    } catch (error) {
      console.error("Error adding review", error);
    }
  };

  const updateReview = async (id: string, updateData: UpdateReviewDto) => {
    try {
      const client = axiosClient(true);
      const { data } = await client.put(`/reviews/${id}`, updateData);
      setReviews((prev) => prev.map((rev) => (rev.id === id ? data : rev))); // Cập nhật review trong state
      // Refresh lại dữ liệu sau khi cập nhật
      fetchReviews();
    } catch (error) {
      console.error("Error updating review", error);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const client = axiosClient(false);
      await client.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((rev) => rev.id !== id)); // Xóa review khỏi state
      // Refresh lại dữ liệu sau khi xóa
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product_id]); // Fetch lại dữ liệu khi `product_id` thay đổi

  return { reviews, loading, addReview, updateReview, deleteReview };
};
