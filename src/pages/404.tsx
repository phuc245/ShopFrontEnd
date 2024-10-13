import Logo from "@/assets/logo.jpg";
function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <img
          src={Logo}
          alt=""
          className="rounded-full object-cover w-60 h-60 object-center mb-5"
        />
      </div>
      <h1 className="text-3xl font-bold text-red-500 mb-10">
        Trang giao diện hiện không có
      </h1>
      <h1 className="text-3xl font-bold text-red-500 leading-loose">
        Vui lòng quay lại...........
      </h1>
    </div>
  );
}

export default NotFoundPage;
