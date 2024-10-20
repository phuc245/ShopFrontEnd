import { Button } from "@/components/ui/button";
import { useAddCart } from "@/hooks/query-cart/useAddCart";
import { useDeleteProductCart } from "@/hooks/query-cart/useDeleteProductCart";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import { calSale, totalItems } from "@/utils/commons";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { data: cart } = useGetCart();
  const navigate = useNavigate();
  const mutationAddCart = useAddCart();
  const mutationDeleteCart = useDeleteProductCart();

  function handleQuantity(product_id: string, quantity: number) {
    mutationAddCart.mutate({ product_id, quantity });
  }

  function handleDeleteCart(id: string) {
    mutationDeleteCart.mutate(id);
  }

  return (
    <div className="mx-20 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Giỏ Hàng</h1>
      <ul className="space-y-4">
        {cart?.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center">
              <img
                src={item.product_id.image_url}
                alt={item.product_id.image_url}
                className="w-20 h-20 rounded-lg mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {item.product_id.name}
                </h2>
                <p className="text-gray-600">
                  Giá:{" "}
                  {calSale(
                    item.product_id.price,
                    item.product_id.sale
                  ).toLocaleString()}{" "}
                  VNĐ
                </p>
                <div className="flex gap-2 items-center">
                  <p className="text-gray-600">Số lượng: </p>
                  <div className="flex items-center mt-2">
                    <Button
                      onClick={() => handleQuantity(item.product_id._id, -1)}
                      size={"icon"}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      onClick={() => handleQuantity(item.product_id._id, 1)}
                      size={"icon"}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => handleDeleteCart(item.product_id._id)}
                size={"icon"}
                variant={"destructive"}
                className="ml-auto"
              >
                Xoá
              </Button>
              <p className="text-xl font-bold">
                {calSale(item.product_id.price, item.product_id.sale) *
                  item.quantity}{" "}
                VNĐ
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between">
        <h2 className="text-xl font-bold">Tổng Cộng:</h2>
        <p className="text-xl font-bold">{totalItems(cart ?? [])} VNĐ</p>
      </div>
      {cart && cart.length > 0 ? (
        <button
          onClick={() => navigate("/place-order")}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Thanh Toán
        </button>
      ) : (
        <button
          onClick={() => navigate("/products")}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Tìm Hàng
        </button>
      )}
    </div>
  );
}

export default CartPage;
