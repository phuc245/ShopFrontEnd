// src/pages/home/promotions/index.tsx
import PromotionList from "@/components/promotions/promotionList";
import React from "react";

const PromotionsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1>Promotions</h1>
      <PromotionList />
    </div>
  );
};

export default PromotionsPage;
