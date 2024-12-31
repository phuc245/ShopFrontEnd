import { cartsApi } from "@/api/cart-api";
import useToastMessage from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAddMultipleCart = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (
      cartItems: { product_id: string; quantity: number }[]
    ) => {
      // Gửi mảng sản phẩm lên API
      return (await cartsApi.addMultipleCarts(cartItems))?.data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["cart"] }); // Làm mới dữ liệu giỏ hàng
      toastSuccess("Đã thêm sản phẩm vào giỏ hàng thành công!");
    },
    onError: (error: ErrorResponse) => {
      if (error.statusCode == 401) {
        toastError("Bạn vui lòng đăng nhập");
        navigate("/login");
        return error;
      }
      toastError("Thêm sản phẩm vào giỏ hàng thất bại");
      return error;
    },
  });
};
