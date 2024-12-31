import React from "react";
import ComboCard from "./ComboCard";
import { Combo } from "@/types/combo";

interface ComboListProps {
  combos: Combo[];
  onDeleteCombo: (comboId: string) => void;
}

const ComboList: React.FC<ComboListProps> = ({ combos, onDeleteCombo }) => {
  if (combos.length === 0)
    return <div className="text-center text-lg">No combos available</div>;

  return (
    <div className="grid grid-cols-1 gap-6">
      {combos.map((combo) => (
        <ComboCard key={combo._id} combo={combo} onDelete={onDeleteCombo} />
      ))}
    </div>
  );
};

export default ComboList;
