// src/features/admin/hooks/productos/useProductos.ts

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProductosAsync } from "@/features/admin/services/ApiProducto";
import { getErrorMessage } from "@/errors/ApiError";
import type { ProductosResponse } from "@/types/responses/ProductoResponses";

export const useProductos = () => {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const productosQuery = useQuery<ProductosResponse, Error>({
    queryKey: ["productos", { page, search }],
    queryFn: async () => {
      return await getProductosAsync({
        pageNumber: page,
        pageSize: 10,
        searchTerm: search,
        sortBy: "nombre",
        sortDescending: false,
      });
    },
    placeholderData: (previousData) => previousData, 
  });

  const error = productosQuery.error;

  return {
    productos: productosQuery.data ?? null,
    isLoadingProductos: productosQuery.isLoading,
    productosError: error ? getErrorMessage(error, "Error al cargar productos") : null,
    refetchProductos: () => productosQuery.refetch(),
    page,
    setPage,
    search,
    setSearch,
  };
};