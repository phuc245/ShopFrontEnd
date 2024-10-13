import { ParamPagination } from "@/types/pagination.type";
import axiosClient from "./axios-cilent";
import { CreateCategory } from "@/types/category.type";

export const categoriesApi = {
  getAll(params: ParamPagination) {
    const url = "/categories";
    return axiosClient.get(url, { params });
  },

  GetAllName() {
    const url = "/categories/all";
    return axiosClient.get(url);
  },

  create(body: CreateCategory) {
    const url = "/categories";
    return axiosClient.post(url, body);
  },

  delete(_id: string) {
    const url = `/categories/${_id}`;
    return axiosClient.delete(url);
  },
};
