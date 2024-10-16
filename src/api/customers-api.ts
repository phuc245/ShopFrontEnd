import { ParamPagination } from "@/types/pagination.type";
import axiosClient from "./axios-cilent";
import { Login } from "@/types/login.type";
import { register } from "module";
import { Register } from "@/types/register.type";

export const customersApi = {
  getAll(params: ParamPagination) {
    const url = "/customers";
    return axiosClient.get(url, { params });
  },
  login(body: Login) {
    const url = "/customers/login";
    return axiosClient.post(url, body);
  },
  register(body: Register) {
    const url = "/customers/register";
    return axiosClient.post(url, body);
  },
};
