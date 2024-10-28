import CategoryItem from "@/components/home/category-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import { useGetProductsByCategory } from "@/hooks/query-products/useGetProductsByCategory";
import useDebounce from "@/hooks/useDebounce";
import { calSale, formatPrice } from "@/utils/commons";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductsHomePage() {
  const [keyword, setKeyword] = useState("");
  const debounced = useDebounce(keyword, 2000);
  const { data: categories } = useGetAllCategories({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  const [categoryId, setCategoryId] = useState("all");

  const { data: products } = useGetProductsByCategory(categoryId, debounced);

  return (
    <div className="container mx-auto flex gap-2 p-8">
      <div className="flex flex-col gap-2 p-2">
        <Button
          className={`w-full justify-start ${
            categoryId === "all" && "bg-orange-400"
          }`}
          variant={"ghost"}
          onClick={() => setCategoryId("all")}
        >
          Tất cả
        </Button>
        {categories?.entities?.map((category) => (
          <CategoryItem
            setCategoryId={setCategoryId}
            key={category._id}
            category={category}
            categoryId={categoryId}
          />
        ))}
      </div>
      <div className="flex flex-col gap-8">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tiềm kiếm ..."
        />
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
                    <h1 className="font-bold hover:text-red-500 cursor-pointer">
                      {product.name}
                    </h1>
                  </Link>
                  <h1 className="text-sm italic text-gray-400">
                    {product.description}
                  </h1>
                  <h1>Tác giả: {product.author}</h1>
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
                  <Button className="bg-red-500 hover:bg-green-600">
                    Đặt mua
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsHomePage;
