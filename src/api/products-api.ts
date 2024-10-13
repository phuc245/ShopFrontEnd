import axiosClient from "@/api/axios-cilent";
import { ParamPagination } from "@/types/pagination.type";
import { CreateProduct, InfoProduct } from "@/types/product.type";
import { get } from "http";

export const productsApi = {
  getAll(params: ParamPagination) {
    const url = "/products";
    return axiosClient.get(url, { params: params });
  },
  get(_id: string) {
    const url = `/products/${_id}`;
    return axiosClient.get(url);
  },
  create: (params: CreateProduct) => {
    const { product, main_image, extra_images } = params;

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("status", String(product.status));
    formData.append("cost", String(product.cost));
    formData.append("price", String(product.price));
    formData.append("sale", String(product.sale));
    formData.append("stock", String(product.stock));
    formData.append("category_id", product.category_id);

    if (main_image) {
      formData.append("main_image", main_image);
    }
    if (extra_images.length > 0) {
      extra_images.forEach((file) => {
        formData.append("extra_images", file);
      });
    }

    const url = "/products";
    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete(_id: string) {
    const url = `/products/${_id}`;
    return axiosClient.delete(url);
  },
  updateStatus(_id: string, status: boolean) {
    const url = `/products/${_id}/status`;
    return axiosClient.put(url, {}, { params: { status } });
  },
  update(_id: string, body: InfoProduct) {
    const url = `/products/${_id}`;
    return axiosClient.put(url, body);
  },
  addImage: (id: string, file: File, config: any) => {
    const formData = new FormData();
    formData.append("main_image", file);
    const url = `/products/${id}/main_image`;
    return axiosClient.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  addExtraImages: (id: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("extra_images", file);
    });
    const url = `products/${id}/add_images`;
    return axiosClient.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteExtraImages: (id: string, files: string[]) => {
    const url = `/products/${id}/delete_images`;
    return axiosClient.put(url, { image_ids: files });
  },
};
