import ProtectedRoute from "@/components/protected-route";
import NotFoundPage from "@/pages/404";
import AdminPgae from "@/pages/admin";
import LoginPage from "@/pages/admin/login";
import UsersPage from "@/pages/admin/users";
import CreateUserPage from "@/pages/admin/users/create-user";
import HomePage from "@/pages/home";
import ProductPage from "@/pages/products";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPgae />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/users",
        element: <UsersPage />,
      },
      {
        path: "/admin/product",
        element: <ProductPage />,
      },
      {
        path: "/admin/users/create-user",
        element: <CreateUserPage />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
