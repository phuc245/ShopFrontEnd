import { blogsApi } from "@/api/blog-api";
import useToastMessage from "@/hooks/useToastMessage";
import { CreateBlog } from "@/types/blog.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCreateBlog = () => {
  const { toastSuccess, toastError } = useToastMessage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateBlog) => {
      return (await blogsApi.create(body)).data;
    },
    onSuccess: (data) => {
      toastSuccess("Tạo blog thành công");
      queryClient.refetchQueries({ queryKey: ["blogs"] });
      navigate("/admin/blogs");
    },
    onError: (error: any) => {
      toastError("Tạo blog thất bại");
    },
  });
};
