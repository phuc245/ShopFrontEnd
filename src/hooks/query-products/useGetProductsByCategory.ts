import { productsApi } from "@/api/products-api";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetProductsByCategory = (cate_id: string, keyword: string) => {
  return useQuery<Product[]>({
    queryKey: ["products-cates", cate_id, keyword],
    queryFn: async () => {
      return (await productsApi.getByCategory(cate_id, keyword)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
