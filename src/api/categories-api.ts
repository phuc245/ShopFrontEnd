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

  updateStatus(_id: string, status: boolean) {
    const url = `/categories/${_id}/status`;
    return axiosClient.put(url, {}, { params: { status } });
  },

  get(_id: string) {
    const url = `/categories/${_id}`;
    return axiosClient.get(url);
  },

  update(_id: string, body: CreateCategory) {
    const url = `/categories/${_id}`;
    return axiosClient.put(url, body);
  },
};
