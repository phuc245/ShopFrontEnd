// src/types/combo.ts

export interface ProductInComboDTO {
  product_id: string; // ID sản phẩm (tham chiếu đến bảng Product)
  name: string;
  quantity: number; // Số lượng sản phẩm trong combo
}

export interface CreateComboDTO {
  name: string; // Tên combo
  price: number; // Giá combo sau khi giảm
  products: ProductInComboDTO[]; // Mảng các sản phẩm trong combo
}

export interface Combo {
  _id: string;
  name: string;
  price: number;
  products: { name: string; quantity: number }[];
  createdAt: string;
  updatedAt: string;
}
