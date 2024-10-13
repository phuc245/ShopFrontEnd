import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Thêm các lớp để sử dụng Flexbox */}
      <Header />
      <main className="flex-grow">
        {" "}
        {/* Thân trang sẽ mở rộng để lấp đầy không gian */}
        {/* Các component khác */}
      </main>
      <Footer />
    </div>
  );
  return <div>HomePage</div>;
}

export default HomePage;
