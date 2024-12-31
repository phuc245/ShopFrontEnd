import CategoryItem from "@/components/home/category-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [showAllCategories, setShowAllCategories] = useState(false);

  const { data: products } = useGetProductsByCategory(categoryId, debounced);

  // Kiểm tra nếu có dữ liệu sản phẩm và sắp xếp chúng theo ID (ID mới nhất lên trước)
  const sortedProducts = products?.slice().sort((a, b) => {
    return b._id.localeCompare(a._id); // Sắp xếp ID theo thứ tự giảm dần
  });

  return (
    <div className="container mx-auto flex gap-8 p-8">
      {/* Sidebar for Categories */}
      <div className="w-1/5 bg-white p-3 rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
        <Button
          className={`w-full justify-start text-left py-2 text-sm ${
            categoryId === "all" ? "bg-orange-400" : ""
          }`}
          variant="ghost"
          onClick={() => setCategoryId("all")}
        >
          Tất cả
        </Button>

        {/* Các danh mục */}
        <div className="space-y-2">
          {categories?.entities
            ?.slice(0, showAllCategories ? categories.entities.length : 10)
            .map((category) => (
              <CategoryItem
                setCategoryId={setCategoryId}
                key={category._id}
                category={category}
                categoryId={categoryId}
              />
            ))}
        </div>

        {/* Nút "Xem thêm" */}
        {categories?.entities?.length &&
          categories.entities.length > 10 &&
          !showAllCategories && (
            <Button
              variant="link"
              className="text-sm text-blue-500 mt-4"
              onClick={() => setShowAllCategories(true)} // Toggle to show all categories
            >
              Xem thêm
            </Button>
          )}

        {showAllCategories &&
          categories?.entities?.length &&
          categories.entities.length > 10 && (
            <Button
              variant="link"
              className="text-sm text-blue-500 mt-4"
              onClick={() => setShowAllCategories(false)} // Toggle back to show limited categories
            >
              Thu gọn
            </Button>
          )}
      </div>

      {/* Main product display */}
      <div className="w-4/5 flex flex-col gap-8">
        {/* Tìm kiếm sản phẩm */}
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          className="p-4 mb-6 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg placeholder:text-gray-400 border-2 border-gray-300 hover:border-blue-500 transition-all"
        />

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedProducts?.map((product) => (
            <Card
              key={product._id}
              className="w-full flex flex-col bg-white shadow-lg rounded-lg hover:scale-105 transition-transform"
            >
              <CardHeader className="relative">
                <CardTitle>
                  <img
                    className="rounded-t-lg h-[200px] w-full object-cover"
                    src={product.image_url}
                    alt={product.name}
                  />
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 flex flex-col flex-grow">
                <Link to={`/products/${product._id}`}>
                  <h1 className="font-semibold text-lg text-gray-900 hover:text-red-500 line-clamp-2">
                    {product.name}
                  </h1>
                </Link>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-sm text-gray-500 font-medium mt-2">
                  <strong>Tác giả:</strong> {product.author}
                </p>
              </CardContent>

              {/* Price Section */}
              <div className="p-4 flex flex-col gap-2 mt-auto">
                <div className="flex justify-between items-center">
                  <h1 className="text-red-500 font-semibold text-xl">
                    {formatPrice(calSale(product.price, product.sale))}
                  </h1>
                  <h1 className="font-bold text-gray-500 line-through text-sm">
                    {formatPrice(product.price)}
                  </h1>
                </div>

                {/* Add to Cart Button */}
                <Link to={`/products/${product._id}`} className="w-full mt-4">
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
                    Đặt mua
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsHomePage;
