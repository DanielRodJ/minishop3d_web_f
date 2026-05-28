// src/features/admin/hooks/productos/useProductos.ts

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProductosAsync } from "@/features/admin/services/ApiProducto";
import { handleRequest } from "@/utils/requestUtils";

import type { ProductosResponse } from "@/types/responses/ProductoResponses";

export const useProductos = () => {

  const navigate = useNavigate();

  const [productos, setProductos] = useState<ProductosResponse | null>(null);
  const [isLoadingProductos, setIsLoadingProductos] = useState(false);
  const [productosError, setProductosError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductos = useCallback(async () => {
    const data = await handleRequest({
      setLoading: setIsLoadingProductos,
      setError: setProductosError,
      onAuthError: () => navigate("/shop"),
      errorFallback: "Error al cargar productos",
      request: () => getProductosAsync({
        pageNumber: page,
        pageSize: 10,
        searchTerm: search,
        sortBy: "nombre",
        sortDescending: false,
      }),
    });

    if (data) setProductos(data);
  }, [navigate, page, search]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);
  
  const clearProductosError = () => setProductosError(null);

  return {
    productos,
    isLoadingProductos,
    productosError,
    clearProductosError,
    page,
    setPage,
    search,
    setSearch,
    fetchProductos,
  };
};