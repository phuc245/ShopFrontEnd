import ProtectedRoute from "@/components/protected-route";
import NotFoundPage from "@/pages/404";

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
import LoginHomePage from "@/pages/home/login";
import CustomersPage from "@/pages/admin/customer";
import OrdersPage from "@/pages/admin/orders/orders";
import RegisterHomePage from "@/pages/home/register";
import ProductsHomePage from "@/pages/home/products";
import ProductDetailPage from "@/pages/home/products/detail";
import CartPage from "@/pages/home/cart";
import ForgotPasswordPage from "@/pages/home/forgot-password";
import ResetPasswordPage from "@/pages/home/reset-password";
import CheckoutPage from "@/pages/home/checkout";
import ThanksPage from "@/pages/home/checkout/thanks";
import ProfilePage from "@/pages/home/profile";
import LayoutAdminPage from "@/pages/admin";
import { DashBoardPage } from "@/pages/admin/dashboard";
const router = createBrowserRouter([
  {
    element: <LayoutHomePages />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductsHomePage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/place-order",
        element: <CheckoutPage />,
      },
      {
        path: "/thanks",
        element: <ThanksPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
  //login,register
  {
    path: "/login",
    element: <LoginHomePage />,
  },
  {
    path: "/register",
    element: <RegisterHomePage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  //admin
  {
    element: (
      <ProtectedRoute>
        <LayoutAdminPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <DashBoardPage />,
      },
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
      {
        path: "/admin/customers",
        element: <CustomersPage />,
      },
      {
        path: "/admin/orders",
        element: <OrdersPage />,
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
