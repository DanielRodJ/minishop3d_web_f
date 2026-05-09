// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { AdminLayout } from "@/layouts/AdminLayout";
import { ShopLayout } from "@/layouts/ShopLayout";

import { HomePage } from "@/pages/admin/HomePage";
import { ProductsManagementPage } from "@/pages/admin/ProductsManagementPage";
import { temporal as LoginPage } from "@/pages/auth/LoginPage";
import ErrorPage from "@/pages/auth/ErrorPage";
import ShopPage from "@/pages/shop/ShopPage";
import PostDetailPage from "@/pages/shop/ListingDetailPage";
import { ListingsManagementPage } from "@/pages/admin/ListingManagementPage";

import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

import { AuthProvider } from "@/context/AuthContext";

import "@/index.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/shop",
    element: <ShopLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ShopPage /> },
      { path: ":postId", element: <PostDetailPage /> },
    ],
  },
  {
    element: <ProtectedRoute adminRole={true} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "products", element: <ProductsManagementPage /> },
          { path: "listings", element: <ListingsManagementPage /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/shop" />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);