import axiosClient from "@/api/axios-cilent";

const API_URL = "http://localhost:3001/combos"; // URL API của bạn

// Lấy danh sách tất cả combo
export const getCombos = async () => {
  const response = await axiosClient(false).get(API_URL);
  return response.data;
};

// Tạo combo mới
export const createCombo = async (comboData: {
  name: string;
  price: number;
  products: { product_id: string; quantity: number }[];
}) => {
  const response = await axiosClient(false).post(API_URL, comboData);
  return response.data;
};

// Xóa combo
export const deleteCombo = async (comboId: string) => {
  try {
    const response = await axiosClient(false).delete(`${API_URL}/${comboId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete combo:", error); // Log lỗi để debug
    throw error; // Ném lỗi để có thể xử lý ở các component
  }
};
