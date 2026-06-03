// src/features/admin/hooks/productos/useProductoPresentaciones.ts

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProductoPresentacionesAsync } from "@/features/admin/services/ApiProducto";
import { getErrorMessage } from "@/errors/ApiError";
import type { ProductoPresentacionesResponse } from "@/types/responses/ProductoPresentacionResponses";

export const useProductoPresentaciones = (productoId: number | undefined) => {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const presentacionesQuery = useQuery<ProductoPresentacionesResponse, Error>({
    queryKey: ["producto", productoId, "presentaciones-listado", { page, search }],
    queryFn: async () => {
      if (!productoId) throw new Error("ID de producto no válido");
      
      return await getProductoPresentacionesAsync(productoId, {
        pageNumber: page,
        pageSize: 10,
        searchTerm: search,
        sortBy: "productoId",
        sortDescending: false,
      });
    },
    enabled: !!productoId,
    placeholderData: (previousData) => previousData,
  });

  const error = presentacionesQuery.error;

  return {
    productoPresentaciones: presentacionesQuery.data ?? null,
    isLoadingProductoPresentaciones: presentacionesQuery.isLoading,
    productoPresentacionesError: error ? getErrorMessage(error, "Error al cargar presentaciones") : null,
    refetchProductoPresentaciones: () => presentacionesQuery.refetch(),
    page,
    setPage,
    search,
    setSearch,
  };
};