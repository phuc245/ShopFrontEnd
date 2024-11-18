import { ParamPagination } from "@/types/pagination.type";
import axiosClient from "./axios-cilent";

export const ordersApi = {
  getAll(params: ParamPagination) {
    const url = "/orders";
    return axiosClient(false).get(url, { params });
  },

  me() {
    const url = "/orders/me";
    return axiosClient(false).get(url);
  },

  getOne(_id: string) {
    const url = `/orders/${_id}`;
    return axiosClient(false).get(url);
  },

  // Thêm API tạo đơn hàng
  createOrder(cartItems: any[], checkoutData: any) {
    const url = "/orders";
    return axiosClient(true).post(url, { cartItems, ...checkoutData });
  },
};
