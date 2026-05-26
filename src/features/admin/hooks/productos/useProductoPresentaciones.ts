// src/features/admin/hooks/useProductoPresentaciones.ts

import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProductoPresentacionesAsync } from "@/features/admin/services/ApiProducto";
import { handleRequest } from "@/utils/requestUtils";

import type { ProductoPresentacionesResponse } from "@/types/responses/ProductoPresentacionResponses";

export const useProductoPresentaciones = () => {

  const navigate = useNavigate();

  const [productoPresentaciones, setProductoPresentaciones] = useState<ProductoPresentacionesResponse | null>(null);
  const [isLoadingProductoPresentaciones, setIsLoadingProductoPresentaciones] = useState(false);
  const [productoPresentacionesError, setProductoPresentacionesError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductoPresentaciones = useCallback(async (id: number) => {
    const data = await handleRequest({
      setLoading: setIsLoadingProductoPresentaciones,
      setError: setProductoPresentacionesError,
      onAuthError: () => navigate("/shop"),
      errorFallback: "Error al cargar presentaciones del producto",
      request: () => getProductoPresentacionesAsync(id, {
        pageNumber: page,
        pageSize: 10,
        searchTerm: search,
        sortBy: "productoId",
        sortDescending: false,
      }),
    });

    if (data) setProductoPresentaciones(data);
    return data !== null;
  }, [navigate, page, search]);

  return {
    productoPresentaciones,
    isLoadingProductoPresentaciones,
    productoPresentacionesError,
    page,
    setPage,
    search,
    setSearch,
    fetchProductoPresentaciones,
  };
};