// src/components/promotions/PromotionItem.tsx
import { Promotion } from "@/types/promotion";
import React from "react";

interface PromotionItemProps {
  promotion: Promotion;
}

const PromotionItem: React.FC<PromotionItemProps> = ({ promotion }) => {
  return (
    <div className="promotion-item">
      <h3>{promotion.title}</h3>
      <p>Discount: {promotion.discountPercentage}%</p>
      <p>End Date: {promotion.endDate}</p>
    </div>
  );
};

export default PromotionItem;
