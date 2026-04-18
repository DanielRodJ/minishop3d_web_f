import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AdminLayout } from './layouts/AdminLayout';
import { HomePage } from './pages/admin/HomePage';
import { ProductosPage } from './pages/admin/ProductsPage';
import { temporal as LoginPage } from './pages/auth/LoginPage';

import './index.css'
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import ErrorPage from './pages/auth/ErrorPage';
import { AuthProvider } from './context/AuthContext';
import ShopPage from './pages/shop/ShopPage';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
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
          { path: "products", element: <ProductosPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute adminRole={false} />,
    errorElement: <ErrorPage />,
    children: [
    ],
  },
  {
    path: "/",
    element: <Navigate to="/shop" />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
