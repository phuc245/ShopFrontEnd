// src/components/promotions/PromotionList.tsx
import React, { useEffect } from "react";

import PromotionItem from "./promotionItem";

const PromotionList: React.FC = () => {
  const { promotions, fetchPromotions } = usePromotionStore();

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  return (
    <div className="promotion-list">
      {promotions.map((promotion) => (
        <PromotionItem key={promotion._id} promotion={promotion} />
      ))}
    </div>
  );
};

export default PromotionList;
