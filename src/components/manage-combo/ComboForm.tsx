import React, { useState, useEffect } from "react";

import { LocalUtils } from "@/utils/local-util";
import axios from "axios";
import { useGetAllProducts } from "@/hooks/query-products/useGetAllProducts";
import { useCombo } from "@/hooks/query-combo/useCombo";

const ComboForm: React.FC = () => {
  const [combo, setCombo] = useState({
    name: "",
    products: [] as {
      product_id: string;
      name: string;
      price: number;
      quantity: number;
    }[],
  });

  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );

  const { data, isLoading, error } = useGetAllProducts({
    page: 1,
    limit: 10,
    sort: "name",
  });

  const products = data?.entities || [];
  const { combos } = useCombo();

  // Tự động điền tên combo theo số lượng combo đã có
  useEffect(() => {
    const comboCount = combos.length;
    setCombo((prev) => ({
      ...prev,
      name: `Combo ${comboCount + 1}`,
    }));
  }, [combos]);

  const calculateDiscountedPrice = (basePrice: number) => {
    // Giảm 10%
    const priceAfterDiscount = basePrice * 0.9;

    // Giảm thêm từ 20k đến 30k
    const additionalDiscount = Math.random() * (30000 - 20000) + 20000;

    // Trả về giá sau khi áp dụng các mức giảm
    return priceAfterDiscount - additionalDiscount;
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) => {
      const updated = new Set(prev);
      if (updated.has(productId)) {
        updated.delete(productId);
      } else {
        updated.add(productId);
      }
      return updated;
    });
  };

  const handleCreateCombo = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedProductsArray = Array.from(selectedProducts);
    const selectedProductDetails = selectedProductsArray
      .map((productId) => {
        const product = products.find((p) => p._id === productId);
        return product
          ? {
              product_id: product._id,
              name: product.name,
              price: product.price,
              quantity: 1,
            }
          : null;
      })
      .filter(Boolean);

    if (selectedProductDetails.length === 0) {
      alert("Please select at least one product to create a combo");
      return;
    }

    const basePrice = selectedProductDetails.reduce((totalPrice, product) => {
      totalPrice += product?.price || 0;
      return totalPrice;
    }, 0);

    const discountedPrice = calculateDiscountedPrice(basePrice);

    const newCombo = {
      ...combo,
      price: discountedPrice,
      products: selectedProductDetails,
    };

    try {
      const local = LocalUtils.getLocalToken();
      await axios.post("http://localhost:3001/combos", newCombo, {
        headers: {
          Authorization: `Bearer ${local}`,
        },
      });
      alert("Combo created successfully!");

      // Reset form after creating combo
      setCombo({ name: `Combo ${combos.length + 1}`, products: [] });
      setSelectedProducts(new Set());
    } catch (error) {
      console.error("Error creating combo:", error);
      alert("Error creating combo. Please try again.");
    }
  };

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <form
      onSubmit={handleCreateCombo}
      className="bg-gray-50 p-6 rounded-lg shadow-lg w-1/3 mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create New Combo
      </h2>
      <input
        type="text"
        value={combo.name}
        onChange={(e) => setCombo({ ...combo, name: e.target.value })}
        placeholder="Combo Name"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Select Products</h3>
        <div className="space-y-2">
          {products.map((product) => (
            <div key={product._id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.has(product._id)}
                onChange={() => handleSelectProduct(product._id)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                {product.name} - {product.price} VND
              </label>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create Combo
      </button>
    </form>
  );
};

export default ComboForm;
