import ProtectedRoute from "@/components/protected-route";
import NotFoundPage from "@/pages/404";
import AdminPgae from "@/pages/admin";
import CategoriesPage from "@/pages/admin/categories";
import CreateCategoryPage from "@/pages/admin/categories/create";
import UpdateCategoryPage from "@/pages/admin/categories/update";
import LoginPage from "@/pages/admin/login";
import UsersPage from "@/pages/admin/users";
import CreateUserPage from "@/pages/admin/users/create";
import UpdateUserPage from "@/pages/admin/users/update";
import HomePage from "@/pages/home";
import ProductPage from "@/pages/admin/products";
import { createBrowserRouter } from "react-router-dom";
import CreateProductPage from "@/pages/admin/products/create";
import UpdateProductPage from "@/pages/admin/products/update";
import LayoutHomePages from "@/pages/home/layout";
const router = createBrowserRouter([
  {
    element: <LayoutHomePages />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
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
        path: "/admin/products",
        element: <ProductPage />,
      },
      {
        path: "/admin/users/create-user",
        element: <CreateUserPage />,
      },
      {
        path: "/admin/users/:id",
        element: <UpdateUserPage />,
      },
      {
        path: "/admin/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/admin/categories/create-category",
        element: <CreateCategoryPage />,
      },
      {
        path: "/admin/categories/:id",
        element: <UpdateCategoryPage />,
      },
      {
        path: "/admin/products/create-product",
        element: <CreateProductPage />,
      },
      {
        path: "/admin/products/:id",
        element: <UpdateProductPage />,
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
