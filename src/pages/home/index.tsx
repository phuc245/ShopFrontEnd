import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link để liên kết đến trang chi tiết sản phẩm
import { useGetProductIndex } from "@/hooks/query-products/useGetProductIndex"; // API call để lấy tất cả sản phẩm
import { formatPrice, calSale } from "@/utils/commons"; // Hàm format giá tiền và tính giá sale

function HomePage() {
  const [listProduct, setListProduct] = useState<any[]>([]); // Sản phẩm đầu trang chủ
  const [additionalProducts, setAdditionalProducts] = useState<any[]>([]); // Sản phẩm gợi ý thêm
  const { data: products, isLoading, error } = useGetProductIndex("all", ""); // API lấy tất cả sản phẩm

  useEffect(() => {
    if (products && products.length > 0) {
      // Lấy 3 sản phẩm đầu tiên
      setListProduct(products.slice(0, 3));
      // Lấy 3 sản phẩm tiếp theo
      setAdditionalProducts(products.slice(3, 6));
    }
  }, [products]);

  if (isLoading) {
    return <div>Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div>Không thể tải sản phẩm. Vui lòng thử lại sau!</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Phần video giới thiệu */}
          <section className="w-full md:w-1/3">
            <h2 className="text-3xl font-semibold mb-4">Video Giới Thiệu</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64"
                src="https://www.youtube.com/embed/ur4-pbHLslI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* Phần giới thiệu */}
          <section className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              Chào mừng đến với Book Store
            </h1>
            <p className="text-gray-700 text-lg mb-4">
              Khám phá một bộ sưu tập sách phong phú từ nhiều thể loại và tác
              giả khác nhau. Cho dù bạn đang tìm kiếm một cuốn sách bán chạy
              nhất hay một tác phẩm kinh điển, chúng tôi đều có đầy đủ. Hãy tận
              hưởng trải nghiệm mua sắm tuyệt vời cùng chúng tôi!
            </p>
          </section>
        </div>

        {/* Phần Top sản phẩm */}
        <section className="mt-8">
          <h2 className="text-3xl font-semibold mb-4">Top Bestselling Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {listProduct.map((product) => {
              const salePrice = product.sale
                ? calSale(product.price, product.sale)
                : null; // Tính giá sale nếu có

              return (
                <div
                  key={product._id}
                  className="border p-4 rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
                >
                  {/* Bọc hình ảnh và tên sản phẩm trong thẻ Link */}
                  <Link to={`/products/${product._id}`} className="block">
                    {/* Hình ảnh sản phẩm */}
                    <img
                      src={product.image_url || "/placeholder.png"}
                      alt={product.name || "No Name"}
                      className="w-full h-64 object-contain rounded-lg mb-4"
                    />
                    {/* Tên sản phẩm */}
                    <h3 className="text-xl font-bold">
                      {product.name || "No Name"}
                    </h3>
                  </Link>

                  {/* Hiển thị giá */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">Giá tiền:</span>
                    {/* Nếu có giá sale, hiển thị giá gốc bị gạch bỏ */}
                    {salePrice ? (
                      <span className="line-through text-gray-500">
                        {formatPrice(product.price)}
                      </span>
                    ) : (
                      <span className="text-gray-800">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Nếu có giá sale, hiển thị giá sale */}
                  {salePrice && (
                    <p className="text-xl font-semibold text-red-500">
                      {formatPrice(salePrice)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Phần các sản phẩm khác */}
        <section className="mt-8">
          <h2 className="text-3xl font-semibold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {additionalProducts.map((product) => {
              const salePrice = product.sale
                ? calSale(product.price, product.sale)
                : null; // Tính giá sale nếu có

              return (
                <div
                  key={product._id}
                  className="border p-4 rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
                >
                  {/* Bọc hình ảnh và tên sản phẩm trong thẻ Link */}
                  <Link to={`/products/${product._id}`} className="block">
                    {/* Hình ảnh sản phẩm */}
                    <img
                      src={product.image_url || "/placeholder.png"}
                      alt={product.name || "No Name"}
                      className="w-full h-64 object-contain rounded-lg mb-4"
                    />
                    {/* Tên sản phẩm */}
                    <h3 className="text-xl font-bold">
                      {product.name || "No Name"}
                    </h3>
                  </Link>

                  {/* Hiển thị giá */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">Giá tiền:</span>
                    {/* Nếu có giá sale, hiển thị giá gốc bị gạch bỏ */}
                    {salePrice ? (
                      <span className="line-through text-gray-500">
                        {formatPrice(product.price)}
                      </span>
                    ) : (
                      <span className="text-gray-800">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Nếu có giá sale, hiển thị giá sale */}
                  {salePrice && (
                    <p className="text-xl font-semibold text-red-500">
                      {formatPrice(salePrice)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Khoảng cách để tránh đè lên footer */}
      <div className="mb-8"></div>
    </div>
  );
}

export default HomePage;
