// src/api/promotionApi.ts
import { CreatePromotionDTO, Promotion } from "@/types/promotion";
import axios from "axios";

export const fetchPromotions = async (): Promise<Promotion[]> => {
  const response = await axios.get("/api/promotions");
  return response.data;
};

export const fetchPromotionById = async (
  promotionId: string
): Promise<Promotion> => {
  const response = await axios.get(`/api/promotions/${promotionId}`);
  return response.data;
};

export const createPromotion = async (promotionData: CreatePromotionDTO) => {
  const response = await axios.post("/api/promotions", promotionData);
  return response.data;
};

// Các API khác như update và delete...
