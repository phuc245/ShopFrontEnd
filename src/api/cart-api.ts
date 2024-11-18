import axiosClient from "@/api/axios-cilent";

export const cartsApi = {
  getCart: () => {
    const url = "/carts";
    return axiosClient(false).get(url);
  },

  addCart: (
    product_id: string,
    quantity: number,
    isCombo = false,
    comboDetails = []
  ) => {
    const url = "/carts";
    // Nếu sản phẩm là combo, cần gửi thêm thông tin các sản phẩm con (comboDetails)
    return axiosClient(false).post(url, {
      product_id,
      quantity,
      isCombo, // Cờ xác định sản phẩm có phải là combo không
      comboDetails, // Thông tin sản phẩm con trong combo
    });
  },

  deleteCart: (id: string) => {
    const url = `/carts/product/${id}`;
    return axiosClient(false).delete(url);
  },
};
