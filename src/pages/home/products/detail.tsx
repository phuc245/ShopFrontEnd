import { FaRegUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { reviewsApi } from "@/api/review-api";
import { Review } from "@/types/review";
import { useAddCart } from "@/hooks/query-cart/useAddCart";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { calSale, formatPrice } from "@/utils/commons";
import EmblaCarousel from "@/components/embla-carousel";
import { getCombos } from "@/api/combo-api"; // API combo
import { Combo } from "@/types/combo";
import { useGetMeCustomer } from "@/hooks/query-customer/useGetMeCustomer";

function ProductDetailPage() {
  const { data: customer } = useGetMeCustomer(); // Lấy thông tin khách hàng hiện tại
  const userId = customer?._id; // Lấy userId từ thông tin khách hàng
  const { id: productId } = useParams();
  const { data: product } = useGetProduct(productId ?? "");
  const [listImage, setListImage] = useState<
    { image_id: string; image_url: string }[]
  >([]);
  const [quantity, setQuantity] = useState(1);
  const [combos, setCombos] = useState<Combo[]>([]); // State để lưu combo sản phẩm
  const [reviews, setReviews] = useState<Review[]>([]); // State để lưu đánh giá
  const [newReviewContent, setNewReviewContent] = useState(""); // Nội dung đánh giá mới
  const [rating, setRating] = useState(5); // Mặc định là 5 sao
  const [editReview, setEditReview] = useState<Review | null>(null); // Đánh giá đang được chỉnh sửa
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

      // Lấy danh sách combo khi sản phẩm có dữ liệu
      getCombos().then((data) => {
        setCombos(data);
      });

      // Lấy danh sách đánh giá cho sản phẩm
      reviewsApi
        .getByProduct(productId ?? "", { page: 1, pageSize: 10 })
        .then((response) => {
          setReviews(response.data); // Set dữ liệu đánh giá
        });
    }
  }, [product, productId]);

  function handleQuantity(quantity: number) {
    if (quantity > 0) {
      setQuantity(quantity);
    }
  }

  function handleAddCart(product_id: string, qty: number) {
    mutation.mutate(
      { product_id: product_id, quantity: qty },
      {
        onSuccess: () => {
          alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
        },
        onError: (error) => {
          console.error(
            "Thêm sản phẩm thất bại:",
            error.response?.data || error
          );
          alert("Thêm sản phẩm vào giỏ hàng thất bại!");
        },
      }
    );
  }

  // Hàm thêm đánh giá mới
  const handleAddReview = () => {
    if (newReviewContent.trim()) {
      reviewsApi
        .create({
          product_id: productId ?? "",
          user_id: userId, // Truyền userId vào đây
          content: newReviewContent,
          rating: rating,
        })
        .then((response) => {
          alert("Đánh giá của bạn đã được thêm thành công!");
          setReviews((prevReviews) => [...prevReviews, response.data]);
          setNewReviewContent(""); // Reset nội dung đánh giá
        })
        .catch((error) => {
          console.error("Lỗi khi thêm đánh giá", error.response?.data || error);
          alert("Đã có lỗi xảy ra khi thêm đánh giá!");
        });
    } else {
      alert("Vui lòng nhập nội dung đánh giá!");
    }
  };

  // Hàm sửa đánh giá
  const handleEditReview = (review: Review) => {
    setEditReview(review);
    setNewReviewContent(review.content); // Đưa nội dung cũ vào textarea
  };

  // Hàm lưu đánh giá đã chỉnh sửa
  const handleSaveEditReview = () => {
    if (editReview && newReviewContent.trim()) {
      reviewsApi
        .update(editReview._id, {
          content: newReviewContent,
          rating: rating,
        })
        .then((response) => {
          alert("Đánh giá của bạn đã được sửa thành công!");
          setReviews((prevReviews) =>
            prevReviews.map((rev) =>
              rev._id === editReview._id ? response.data : rev
            )
          );
          setEditReview(null); // Reset form sửa
          setNewReviewContent(""); // Reset nội dung
        })
        .catch((error) => {
          console.error("Lỗi khi sửa đánh giá", error.response?.data || error);
          alert("Đã có lỗi xảy ra khi sửa đánh giá!");
        });
    } else {
      alert("Vui lòng nhập nội dung đánh giá!");
    }
  };

  // Hàm xóa đánh giá
  const handleDeleteReview = (reviewId: string) => {
    reviewsApi
      .delete(reviewId)
      .then(() => {
        setReviews((prevReviews) =>
          prevReviews.filter((rev) => rev._id !== reviewId)
        );
        alert("Đánh giá đã được xóa!");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa đánh giá", error.response?.data || error);
        alert("Đã có lỗi xảy ra khi xóa đánh giá!");
      });
  };

  // Hàm để tạo ra mã khách hàng duy nhất
  // const getCustomerCode = (userId: string) => {
  //   const seenUsers: Record<string, string> = {};
  //   let userCode =
  //     seenUsers[userId] || `customer@${Object.keys(seenUsers).length + 1}`;
  //   seenUsers[userId] = userCode;
  //   return userCode;
  // };

  return (
    <div className="container mx-auto p-8 flex flex-col gap-8">
      {/* Phần chính với hình ảnh và thông tin */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          {listImage && <EmblaCarousel listImages={listImage} />}
        </div>
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
              onClick={() => handleAddCart(product?._id ?? "", quantity)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>

      {/* Phần combo sản phẩm */}
      {/* {combos.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold">Các combo sản phẩm</h3>
          <div className="mt-4">
            <div className="flex flex-wrap gap-6">
              {combos.map((combo, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-60"
                >
                  <h4 className="text-xl font-semibold text-center">
                    {combo.name}
                  </h4>
                  <p className="text-lg text-gray-600 text-center">
                    Giá: {formatPrice(combo.price)}
                  </p>
                  <div className="mt-4 w-full">
                    <h5 className="font-semibold">Sản phẩm trong combo:</h5>
                    <ul className="list-disc pl-5">
                      {combo.products.map((product, index) => (
                        <li key={index} className="text-gray-700">
                          {product.product_id.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => handleAddComboToCart(combo)} //cần sửa
                    className="mt-4 bg-green-600 text-white"
                  >
                    Thêm tất cả vào giỏ hàng
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* Phần mô tả sản phẩm */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
        <p className="text-gray-700">{product?.description}</p>
      </div>

      {/* Phần đánh giá */}
      <div className="mt-4">
        {reviews.length > 0 ? (
          <div>
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border-b py-4 flex items-center gap-4"
              >
                <FaRegUserCircle className="w-12 h-12 text-gray-500" />
                <div>
                  <p className="font-semibold">
                    {/* Hiển thị tên nếu user_id là object */}
                    {/* Kiểm tra nếu user_id tồn tại và có tên */}
                    User:{" "}
                    {review.user_id &&
                    typeof review.user_id === "object" &&
                    review.user_id.name
                      ? review.user_id.name
                      : "Unknown User"}
                  </p>
                  <p className="text-gray-600">{review.content}</p>
                  <p className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <Button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-500 underline bg-transparent hover:text-blue-600"
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-500 underline bg-transparent hover:text-red-600"
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        )}
      </div>

      {/* Phần thêm đánh giá */}
      <div className="mt-6">
        <h4 className="font-semibold">
          {editReview ? "Chỉnh sửa đánh giá" : "Đánh giá của bạn"}
        </h4>
        <textarea
          value={newReviewContent}
          onChange={(e) => setNewReviewContent(e.target.value)}
          placeholder="Nhập nội dung đánh giá..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="mt-4">
          <span className="font-semibold">Điểm đánh giá:</span>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="ml-2 p-2 border border-gray-300 rounded-md"
          >
            <option value={1}>1 sao</option>
            <option value={2}>2 sao</option>
            <option value={3}>3 sao</option>
            <option value={4}>4 sao</option>
            <option value={5}>5 sao</option>
          </select>
        </div>
        <Button
          onClick={editReview ? handleSaveEditReview : handleAddReview}
          className="mt-4 bg-blue-500 text-white"
        >
          {editReview ? "Lưu sửa đổi" : "Thêm đánh giá"}
        </Button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
