import { Customer } from "@/types/customer.type";
import { Product } from "@/types/product.type";

export type ComboDetail = {
  product_id: Product;
  quantity: number;
};

export type Cart = {
  _id: string;
  product_id: Product;
  customer_id: Customer;
  quantity: number;
  isCombo: boolean;
  comboDetails?: ComboDetail[];
};
