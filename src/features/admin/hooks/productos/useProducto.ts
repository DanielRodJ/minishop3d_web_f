// src/features/admin/hooks/productos/useProducto.ts

import { useQuery } from "@tanstack/react-query";

import {
  getCantidadPresentacionesAsync,
  getProductoAsync
} from "@/features/admin/services/ApiProducto";

import { getErrorMessage } from "@/errors/ApiError";

import type {
  ProductoResponse,
  CantidadesPresentacionesResponse
} from "@/types/responses/ProductoResponses";

export const useProducto = (productoId: number | undefined) => {

  // GetProductoQuery.
  const productoQuery = useQuery<ProductoResponse, Error>({
    queryKey: ["producto", productoId],
    queryFn: async () => {
      if (!productoId) throw new Error("ID no válido");
      return await getProductoAsync(productoId);
    },
    enabled: !!productoId,
  });

  // GetCantidadPresentacionesQuery.
  const cantidadPresentacionesQuery = useQuery<CantidadesPresentacionesResponse, Error>({
    queryKey: ["producto", productoId, "cantidad-presentaciones"],
    queryFn: async () => {
      if (!productoId) throw new Error("ID no válido");
      return await getCantidadPresentacionesAsync(productoId);
    },
    enabled: !!productoId,
    retry: false,
  });

  const error = productoQuery.error;

  return {
    producto: productoQuery.data ?? null,
    cantidadPresentaciones: cantidadPresentacionesQuery.data ?? null,
    isLoadingProducto: productoQuery.isLoading,
    productoError: error ? getErrorMessage(error, "Error al cargar producto") : null,
    refetchProducto: () => {
      productoQuery.refetch();
      cantidadPresentacionesQuery.refetch();
    },
  };
};