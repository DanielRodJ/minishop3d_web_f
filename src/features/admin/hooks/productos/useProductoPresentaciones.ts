// src/features/admin/hooks/productos/useProductoPresentaciones.ts

// Librerías externas.
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Servicios.
import { getProductoPresentacionesAsync } from "@/features/admin/services/ApiProducto";

// Errores.
import { getErrorMessage } from "@/errors/ApiError";

// Types.
import type { ProductoPresentacionesResponse } from "@/types/responses/ProductoPresentacionResponses";

export const useProductoPresentaciones = (productoId: number | undefined) => {

  const [productoPresentacionespage, setProductoPresentacionesPage] = useState(1);
  const [productoPresentacionesSearch, setProductoPresentacionesSearch] = useState("");

  const presentacionesQuery = useQuery<ProductoPresentacionesResponse, Error>({
    queryKey: ["producto", productoId, "presentaciones-listado", { page: productoPresentacionespage, search: productoPresentacionesSearch }],
    queryFn: async () => {
      if (!productoId) throw new Error("ID de producto no válido");
      
      return await getProductoPresentacionesAsync(productoId, {
        pageNumber: productoPresentacionespage,
        pageSize: 10,
        searchTerm: productoPresentacionesSearch,
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
    productoPresentacionespage,
    setProductoPresentacionesPage,
    productoPresentacionesSearch,
    setProductoPresentacionesSearch,
  };
};