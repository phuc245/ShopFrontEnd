import { createCombo, deleteCombo, getCombos } from "@/api/combo-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Combo } from "@/types/combo";

// Hook để lấy danh sách combo và xử lý tạo, xóa combo
export const useCombo = () => {
  const queryClient = useQueryClient();

  // Lấy danh sách combo
  const {
    data: combos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["combos"], // Query key để theo dõi danh sách combo
    queryFn: getCombos, // Hàm để lấy danh sách combo từ API
    onSuccess: () => {
      console.log("Combos fetched successfully");
    },
    onError: (error) => {
      console.error("Error fetching combos:", error);
    },
  });

  // Mutation để tạo combo mới
  const createComboMutation = useMutation({
    mutationFn: createCombo,
    onSuccess: (newCombo) => {
      // Sau khi tạo combo thành công, invalidates và refetch lại danh sách combo
      queryClient.invalidateQueries(["combos"]);
      console.log("Combo created successfully:", newCombo);
    },
    onError: (error) => {
      console.error("Error creating combo:", error);
    },
  });

  // Mutation để xóa combo
  const deleteComboMutation = useMutation({
    mutationFn: deleteCombo,
    onSuccess: (deletedCombo) => {
      // Sau khi xóa combo thành công, invalidates và refetch lại danh sách combo
      queryClient.invalidateQueries(["combos"]);
      console.log("Combo deleted successfully:", deletedCombo);
    },
    onError: (error) => {
      console.error("Error deleting combo:", error);
    },
  });

  // Trả về danh sách combo, trạng thái loading, error, và các mutation để tạo và xóa combo
  return {
    combos, // Danh sách combo
    isLoading, // Trạng thái loading khi đang fetch
    isError, // Trạng thái lỗi nếu fetch thất bại
    createCombo: createComboMutation.mutate, // Hàm để tạo combo mới
    deleteCombo: deleteComboMutation.mutate, // Hàm để xóa combo
  };
};
