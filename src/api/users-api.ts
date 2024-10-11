import { Login } from "@/types/login.type";
import axiosClient from "./axios-cilent";
import { ParamPagination } from "@/types/pagination.type";
import { CreateUser } from "@/types/user.type";

export const usersApi = {
  login(body: Login) {
    const url = "/users/login";
    return axiosClient.post(url, body);
  },

  me() {
    const url = "/users/me";
    return axiosClient.get(url);
  },

  getAll(params: ParamPagination) {
    const url = "/users";
    return axiosClient.get(url, { params });
  },

  updateStatus(_id: string, status: boolean) {
    const url = `/users/${_id}/status`;
    return axiosClient.put(url, {}, { params: { status } });
  },

  createUser(body: CreateUser) {
    const url = "/users";
    return axiosClient.post(url, body);
  },

  getOne(_id: string) {
    const url = `/users/${_id}`;
    return axiosClient.get(url);
  },

  updateUser(_id: string, name: string) {
    const url = `/users/${_id}`;
    return axiosClient.put(url, { name });
  },

  deleteUser(_id: string) {
    const url = `/users/${_id}`;
    return axiosClient.delete(url);
  },
};
