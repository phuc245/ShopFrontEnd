import { useGetMeCustomer } from "@/hooks/query-customer/useGetMeCustomer";
import useToastMessage from "@/hooks/useToastMessage";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { IoLogOutOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { LocalUtils } from "@/utils/local-util";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Header = () => {
  const { data } = useGetMeCustomer();
  const navigate = useNavigate();

  const { toastSuccess } = useToastMessage();

  const handleLogout = () => {
    toastSuccess("Đăng xuất thành công!");
    LocalUtils.removeLocalToken();
    window.location.href = "/";
  };

  return (
    <header className="bg-orange-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <h1>Logo của bạn</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link to={"/"}>
            <Button variant={"ghost"}>Trang chủ</Button>
          </Link>

          <Link to={"/"}>
            <Button variant={"ghost"}>Giới thiệu</Button>
          </Link>

          <Link to={"/products"}>
            <Button variant={"ghost"}>Sản phẩm</Button>
          </Link>

          <Link to={"/blogs"}>
            <Button variant={"ghost"}>Tin tức</Button>
          </Link>
          <Link to={"/contact"}>
            <Button variant={"ghost"}>Liên hệ</Button>
          </Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link to={"/cart"}>
            <Button size={"icon"} className="bg-slate-700">
              <FaCartShopping />
            </Button>
          </Link>
          {data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" forceMount>
                {/* trang thong tin */}
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <IoIosInformationCircleOutline className="mr-2 h-4 w-4" />
                  <span>Thông tin</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <IoLogOutOutline className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to={"/register"}>
                <Button>Đăng Ký</Button>
              </Link>

              <Link to={"/login"}>
                <Button>Đăng Nhập</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
