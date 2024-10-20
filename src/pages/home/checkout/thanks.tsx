import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ThanksPage() {
  return (
    <div className="p-8 flex items-center flex-col gap-2">
      Cảm ơn bạn đã đặt hàng bên shop chúng tôi! Vui lòng kiểm tra email về hoá
      đơn của bạn
      <Link to={"/"}>
        <Button>Quay lại trang chủ</Button>
      </Link>
    </div>
  );
}

export default ThanksPage;
