import axiosClient from "@/api/axios-cilent";

export const checkoutApi = {
  checkout: (body: {
    address: string;
    phone_number: string;
    email: string;
  }) => {
    const url = "/checkout";
    return axiosClient(false).post(url, body);
  },
};
