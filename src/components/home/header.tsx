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
    <header className="bg-gradient-to-r from-blue-300 to-orange-200 text-white shadow-lg py-3">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo với link dẫn đến trang chủ */}
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-3xl font-bold cursor-pointer">BOOKSTORE</h1>
            {/* Tăng kích thước chữ */}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 flex-1 justify-center">
          <Link to={"/"}>
            <Button
              variant="ghost"
              className="text-black text-lg hover:text-gray-700"
            >
              Trang chủ
            </Button>
          </Link>
          <Link to={"/products"}>
            <Button
              variant="ghost"
              className="text-black text-lg hover:text-gray-700"
            >
              Sản phẩm
            </Button>
          </Link>
          <Link to={"/blogs"}>
            <Button
              variant="ghost"
              className="text-black text-lg hover:text-gray-700"
            >
              Tin tức
            </Button>
          </Link>
          <Link to={"/contact"}>
            <Button
              variant="ghost"
              className="text-black text-lg hover:text-gray-700"
            >
              Liên hệ
            </Button>
          </Link>
        </nav>

        {/* Cart and User Section */}
        <div className="flex items-center space-x-4">
          <Link to={"/cart"}>
            <Button
              size="icon"
              className="bg-black text-white h-10 w-10 rounded-full"
            >
              <FaCartShopping className="h-5 w-5" />
            </Button>
          </Link>
          {data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0"
                >
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" forceMount className="text-lg">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <IoIosInformationCircleOutline className="mr-3 h-5 w-5" />
                  <span>Thông tin</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <IoLogOutOutline className="mr-3 h-5 w-5" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Link to={"/register"}>
                <Button className="bg-black text-white text-lg py-2 px-4 rounded hover:bg-gray-800">
                  Đăng Ký
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button className="bg-black text-white text-lg py-2 px-4 rounded hover:bg-gray-800">
                  Đăng Nhập
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
