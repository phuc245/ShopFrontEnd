import { Category } from "@/types/category.type";

export type ProductImages = {
  image_id: string;
  image_url: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  cost: number;
  price: number;
  sale: number;
  stock: number;
  image_id: string;
  image_url: string;
  category_id: string;
  images: ProductImages[];
  author: string;
};

export type InfoProduct = Omit<
  Product,
  "_id" | "image_id" | "image_url" | "images"
>;

export type CreateProduct = {
  product: InfoProduct;
  main_image: File | null;
  extra_images: File[];
};
