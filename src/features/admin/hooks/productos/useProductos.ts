// src/features/admin/hooks/productos/useProductos.ts

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCantidadesPresentacionesAsync, getProductosAsync } from "@/features/admin/services/ApiProducto";
import { getErrorMessage } from "@/errors/ApiError";
import type { CantidadesPresentacionesResponse, ProductosResponse } from "@/types/responses/ProductoResponses";

export const useProductos = () => {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>();
  const [sortDescending, setSortDescending] = useState<boolean>();

  // GetProductosQuery.
  const productosQuery = useQuery<ProductosResponse, Error>({
    queryKey: ["productos", "lista", { page, search, sortBy, sortDescending }],
    queryFn: async () => {
      return await getProductosAsync({
        pageNumber: page,
        pageSize: 10,
        searchTerm: search,
        sortBy: sortBy,
        sortDescending: sortDescending,
      });
    },
    placeholderData: (previousData) => previousData,
  });

  // GetCantidadesPresentacionesQuery.
  const cantidadesPresentacionesQuery = useQuery<CantidadesPresentacionesResponse, Error>({
    queryKey: ["productos", "cantidades-presentaciones"],
    queryFn: async () => getCantidadesPresentacionesAsync(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const error = productosQuery.error;

  return {
    productos: productosQuery.data ?? null,
    cantidadesPresentaciones: cantidadesPresentacionesQuery.data ?? null,
    isLoadingProductos: productosQuery.isLoading,
    productosError: error ? getErrorMessage(error, "Error al cargar productos") : null,
    refetchProductos: () => productosQuery.refetch(),
    page,
    setPage,
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortDescending,
    setSortDescending
  };
};