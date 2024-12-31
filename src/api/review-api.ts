// src/services/reviewService.ts

import { CreateReviewDto, UpdateReviewDto, Review } from "@/types/review";
import axiosClient from "./axios-cilent";

interface ReviewPagination {
  data: Review[];
  total: number;
  page: number;
  pageSize: number;
}

export const reviewsApi = {
  // Lấy tất cả đánh giá của một sản phẩm (phân trang)
  getByProduct(product_id: string, params: { page: number; pageSize: number }) {
    const url = `/reviews/product/${product_id}`;
    return axiosClient(false).get<ReviewPagination>(url, { params });
  },

  // Lấy chi tiết một đánh giá (nếu cần)
  get(_id: string) {
    const url = `/reviews/${_id}`;
    return axiosClient(false).get<Review>(url);
  },

  // Tạo một đánh giá mới
  create(params: CreateReviewDto) {
    const url = "/reviews";
    return axiosClient(false).post<Review>(url, params);
  },

  // Cập nhật một đánh giá
  update(_id: string, params: UpdateReviewDto) {
    const url = `/reviews/${_id}`;
    return axiosClient(false).put<Review>(url, params);
  },

  // Xóa một đánh giá
  delete(_id: string) {
    const url = `/reviews/${_id}`;
    return axiosClient(false).delete<void>(url);
  },

  // Lấy tất cả các đánh giá
  getAll() {
    const url = `/reviews`;
    return axiosClient(true).get<Review[]>(url);
  },
};
