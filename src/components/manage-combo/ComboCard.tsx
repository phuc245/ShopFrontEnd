import React from "react";
import { Combo } from "@/types/combo";

interface ComboCardProps {
  combo: Combo;
  onDelete: (comboId: string) => void;
}

const ComboCard: React.FC<ComboCardProps> = ({ combo, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h3 className="text-xl font-semibold text-gray-900">{combo.name}</h3>
      <p className="text-sm text-gray-600 mt-2">{combo.description}</p>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700">Products:</h4>
        <ul className="list-disc pl-5 text-gray-700 text-sm">
          {combo.products.length === 0 ? (
            <li className="text-gray-500">No products selected</li>
          ) : (
            combo.products.map((productInCombo, index) => (
              <li key={index}>
                {productInCombo.product_id.name} -{" "}
                {productInCombo.product_id.price} x {productInCombo.quantity}
              </li>
            ))
          )}
        </ul>
      </div>
      <button
        onClick={() => onDelete(combo._id)}
        className="mt-4 text-red-500 hover:text-red-700 focus:outline-none"
      >
        Delete Combo
      </button>
    </div>
  );
};

export default ComboCard;
