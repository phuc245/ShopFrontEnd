// src/types/review.ts
import { ResponsePagination } from "./pagination.type";

export interface User {
  id: string;
  name: string;
  email: string;
}

// src/types/review.ts
export interface Review {
  id: string;
  user_id: {
    id: string;
    name: string; // Thêm tên user
  };
  product_id: {
    id: string;
    name: string; // Thêm tên product
  };
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewDto {
  product_id: string;
  user_id: string;
  content: string | undefined;
  rating: number;
}

export interface UpdateReviewDto {
  content: string;
  rating?: number;
}

// Kiểu dữ liệu phản hồi cho danh sách đánh giá
export type ReviewPagination = ResponsePagination<Review>;
