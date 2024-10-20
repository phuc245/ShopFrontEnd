import { customersApi } from "@/api/customers-api";
import useToastMessage from "@/hooks/useToastMessage";

import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
  const { toastSuccess, toastError } = useToastMessage();

  return useMutation({
    mutationFn: async (email: string) => {
      return (await customersApi.forgotPassword(email)).data;
    },
    onSuccess: (data) => {
      toastSuccess("Vui lòng kiểm tra hộp thư email xác thực");
    },
    onError: (error) => {
      toastError("Email không tồn tại");
      return error;
    },
  });
};
