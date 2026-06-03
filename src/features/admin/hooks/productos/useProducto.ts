// src/features/admin/hooks/productos/useProducto.ts

import { useQuery } from "@tanstack/react-query";

import {
  getProductoAsync
} from "@/features/admin/services/ApiProducto";

import { getErrorMessage } from "@/errors/ApiError";

import type {
  ProductoResponse
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

  const error = productoQuery.error;

  return {
    producto: productoQuery.data ?? null,
    isLoadingProducto: productoQuery.isLoading,
    productoError: error ? getErrorMessage(error, "Error al cargar producto") : null,
    refetchProducto: () => {
      productoQuery.refetch();
    },
  };
};