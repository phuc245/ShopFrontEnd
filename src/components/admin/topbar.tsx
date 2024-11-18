import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useToastMessage from "@/hooks/useToastMessage";
import { LocalUtils } from "@/utils/local-util";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const { toastSuccess } = useToastMessage();

  const handleLogout = () => {
    toastSuccess("Đăng xuất thành công!");
    LocalUtils.removeLocalToken();
    navigate("/admin/login");
  };

  return (
    <div className="flex items-center justify-between bg-blue-600 px-6 py-4 shadow-lg">
      {/* Tiêu đề Admin */}
      <h1 className="text-4xl font-extrabold text-white tracking-wider">
        Admin
      </h1>

      {/* Dropdown Menu Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarFallback>TP</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 mt-2 bg-white rounded-md shadow-lg border border-gray-200"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal p-4">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold">TP</p>
              <p className="text-xs text-gray-500">TPhuc&HPhuc@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:bg-red-100 p-2"
          >
            <IoLogOutOutline className="h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TopBar;
