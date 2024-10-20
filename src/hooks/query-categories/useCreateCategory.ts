import { categoriesApi } from "@/api/categories-api";
import useToastMessage from "@/hooks/useToastMessage";
import { CreateCategory } from "@/types/category.type";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToastMessage();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: CreateCategory) => {
      return (await categoriesApi.create(body)).data;
    },
    onSuccess: (response) => {
      toastSuccess("Tạo danh mục thành công");
      queryClient.refetchQueries({ queryKey: ["categories"] });
      queryClient.refetchQueries({ queryKey: ["categories-name"] });
      navigate("/admin/categories");
    },
    onError: (error: ErrorResponse) => {
      toastError("Tạo danh mục thất bại");
      return error;
    },
  });
};
