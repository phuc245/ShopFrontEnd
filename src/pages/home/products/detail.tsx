import EmblaCarousel from "@/components/embla-carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddCart } from "@/hooks/query-cart/useAddCart";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { calSale, formatPrice } from "@/utils/commons";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const [listImage, setListImage] = useState<
    { image_id: string; image_url: string }[]
  >([]);
  const { id: productId } = useParams();
  const { data: product } = useGetProduct(productId ?? "");
  const [quantity, setQuantity] = useState(1);
  const mutation = useAddCart();

  useEffect(() => {
    if (product) {
      const listExtraImages =
        product?.images.map((item) => ({
          image_id: item.image_id,
          image_url: item.image_url,
        })) || [];
      const combinedImages = [
        {
          image_id: product?.image_id ?? "",
          image_url: product?.image_url ?? "",
        },
        ...listExtraImages,
      ];
      setListImage(combinedImages);
    }
  }, [product]);

  function handleQuantity(quantity: number) {
    if (quantity > 0) {
      setQuantity(quantity);
    }
  }

  function handleAddCart() {
    mutation.mutate(
      { product_id: product?._id ?? "", quantity: quantity },
      {
        onSuccess: () => {
          alert("Đã thêm sản phẩm vào giỏ hàng thành công!"); // Bạn có thể thay bằng Toast
          setQuantity(1);
        },
        onError: (error) => {
          console.error("Thêm sản phẩm thất bại:", error);
          alert("Thêm sản phẩm vào giỏ hàng thất bại!");
        },
      }
    );
  }

  return (
    <div className="container mx-auto p-8 flex flex-col gap-8">
      {/* Phần chính với hình ảnh và thông tin */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Hình ảnh sản phẩm */}
        <div className="w-full md:w-1/2 flex justify-center">
          {listImage && <EmblaCarousel listImages={listImage} />}
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col w-full md:w-1/2 gap-6">
          <h1 className="text-4xl font-bold">{product?.name}</h1>
          <p className="text-lg text-gray-600">Tác giả: {product?.author}</p>
          <p className="text-lg">Số lượng còn lại: {product?.stock}</p>

          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Giá tiền:</span>
            <span className="line-through text-gray-500">
              {formatPrice(product?.price ?? 0)}
            </span>
          </div>
          <p className="text-2xl font-semibold text-red-500">
            Giá khuyến mãi:{" "}
            {formatPrice(calSale(product?.price ?? 0, product?.sale ?? 0))}
          </p>

          {/* Số lượng và nút thêm giỏ hàng */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                onClick={() => handleQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <Input
                className="w-16 text-center"
                type="number"
                value={quantity}
                onChange={(e) => handleQuantity(+e.target.value)}
              />
              <Button size="icon" onClick={() => handleQuantity(quantity + 1)}>
                +
              </Button>
            </div>
            <Button
              size="lg"
              onClick={handleAddCart}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>

      {/* Phần mô tả sản phẩm */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
        <p className="text-gray-700">{product?.description}</p>
      </div>
    </div>
  );
}

export default ProductDetailPage;
