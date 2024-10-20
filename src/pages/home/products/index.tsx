// hiển thị trang product
import CategoryItem from "@/components/home/category-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import { useGetProductsByCategory } from "@/hooks/query-products/useGetProductsByCategory";
import { calSale, formatPrice } from "@/utils/commons";

import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProductsHomePage() {
  const { data: categories } = useGetAllCategories({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  const [categoryId, setCategoryId] = useState("all");

  const { data: products } = useGetProductsByCategory(categoryId);

  return (
    <div className="container mx-auto flex gap-2 p-8">
      <div className="flex flex-col gap-2 p-2">
        {categories?.entities?.map((category) => (
          <CategoryItem
            setCategoryId={setCategoryId}
            key={category._id}
            category={category}
            categoryId={categoryId}
          />
        ))}
      </div>
      <div className="flex gap-4">
        {products?.map((product) => (
          <Card key={product._id} className="w-[200px]">
            <CardHeader>
              <CardTitle>
                <img
                  className="rounded-sm h-[150px]"
                  width={200}
                  src={product.image_url}
                  alt={product.name}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Link to={`/products/${product._id}`}>
                  <h1 className="font-bold hover:text-orange-500 cursor-pointer">
                    {product.name}
                  </h1>
                </Link>
                <h1 className="text-sm italic text-gray-400">
                  {product.description}
                </h1>
                <div className="flex gap-2">
                  <h1 className="font-bold line-through">
                    {formatPrice(product.price)}
                  </h1>
                  <h1 className=" text-red-400">
                    {formatPrice(calSale(product.price, product.sale))}
                  </h1>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/products/${product._id}`}>
                <Button>Đặt mua</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductsHomePage;
