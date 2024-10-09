import SideBar from "@/components/admin/sidebar";
import { Outlet } from "react-router-dom";

function AdminPage() {
  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="container p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPage;
