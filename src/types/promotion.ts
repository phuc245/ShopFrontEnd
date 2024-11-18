// src/types/Promotion.ts
export interface Promotion {
  _id: string;
  title: string;
  discountPercentage: number;
  endDate: string;
  products: Array<{
    _id: string;
    name: string;
    discountedPrice: number;
  }>;
}

export interface CreatePromotionDTO {
  title: string;
  discountPercentage: number;
  endDate: string;
}
