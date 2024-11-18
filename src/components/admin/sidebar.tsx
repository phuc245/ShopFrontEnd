import { HomeIcon } from "@radix-ui/react-icons";
import { MdManageAccounts, MdPeopleAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TbCategoryFilled } from "react-icons/tb";
import { FaSwatchbook } from "react-icons/fa";
import { CiBag1 } from "react-icons/ci";
import { BiLogoBlogger } from "react-icons/bi";

const menuItems = [
  {
    title: "Home",
    icon: <HomeIcon className="h-6 w-6 text-blue-400" />,
    link: "/admin",
  },
  {
    title: "Users",
    icon: <MdManageAccounts className="h-6 w-6 text-blue-400" />,
    link: "/admin/users",
  },
  {
    title: "Categories",
    icon: <TbCategoryFilled className="h-6 w-6 text-blue-400" />,
    link: "/admin/categories",
  },
  {
    title: "Products",
    icon: <FaSwatchbook className="h-6 w-6 text-blue-400" />,
    link: "/admin/products",
  },
  {
    title: "Customers",
    icon: <MdPeopleAlt className="h-6 w-6 text-blue-400" />, // Icon mới
    link: "/admin/customers",
  },
  {
    title: "Orders",
    icon: <CiBag1 className="h-6 w-6 text-blue-400" />,
    link: "/admin/orders",
  },
  {
    title: "Blogs",
    icon: <BiLogoBlogger className="h-6 w-6 text-blue-400" />,
    link: "/admin/blogs",
  },
];

function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-800 w-[220px] shadow-lg">
      <h1 className="text-2xl font-bold text-white p-6 border-b border-gray-700">
        Store
      </h1>
      <div className="flex flex-col gap-2 mt-4">
        {menuItems.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 p-4 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200"
            onClick={() => navigate(item.link)}
          >
            {item.icon}
            <h1 className="text-lg font-medium text-white">{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
