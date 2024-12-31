import { Cart } from "@/types/cart.Type";

//fomart giá tiền VND
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

//tiền giam gia
export const calSale = (price: number, sale: number) => {
  return price - (price * sale) / 100;
};

//tính tổng tiền

export const totalItems = (carts: Cart[]) => {
  let total = 0;

  for (const item of carts) {
    // Tinh tien da giam gia
    const sale = item.product_id.price * (item.product_id.sale / 100);
    // Tinh tong tien cua san pham
    total += (item.product_id.price - sale) * item.quantity;
  }

  return total;
};
