import React from "react";
import ComboList from "@/components/manage-combo/ComboList";
import ComboForm from "@/components/manage-combo/ComboForm";
import { useCombo } from "@/hooks/query-combo/useCombo";

const ComboPage: React.FC = () => {
  const { combos, isLoading, isError, createCombo, deleteCombo } = useCombo();

  if (isLoading) return <div>Loading combos...</div>;
  if (isError) return <div>Error loading combos</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Manage Combos</h1>
      <ComboForm onCreateCombo={createCombo} />
      <h2 className="text-2xl font-semibold mt-8">Your Combos</h2>
      <ComboList combos={combos} onDeleteCombo={deleteCombo} />
    </div>
  );
};

export default ComboPage;
