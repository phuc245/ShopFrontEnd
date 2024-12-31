import { productsApi } from "@/api/products-api";
import { ParamPagination, ResponsePagination } from "@/types/pagination.type";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = (params: ParamPagination) => {
  return useQuery<ResponsePagination<Product>>({
    queryKey: ["products", params.page, params.limit, params.sort], // Không cần params.keyword nếu không có
    queryFn: async () => {
      return (
        await productsApi.getAll({
          ...params,
          sort: String(params.sort || ""), // Đảm bảo sort là chuỗi
        })
      ).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
