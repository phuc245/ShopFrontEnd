import { ParamPagination } from "@/types/pagination.type";
import axiosClient from "./axios-cilent";

export const ordersApi = {
  getAll(params: ParamPagination) {
    const url = "/orders";
    return axiosClient.get(url, { params });
  },
};
