// src/features/admin/hooks/productos/useProducto.ts

import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProductoAsync } from "@/features/admin/services/ApiProducto";
import { handleRequest } from "@/utils/requestUtils";

import type { ProductoDetalladoResponse } from "@/types/responses/ProductoResponses";

export const useProducto = () => {

  const navigate = useNavigate();

  const [producto, setProducto] = useState<ProductoDetalladoResponse | null>(null);
  const [isLoadingProducto, setIsLoadingProducto] = useState(false);
  const [productoError, setProductoError] = useState<string | null>(null);

  const fetchProducto = useCallback(async (id: number) => {
    const data = await handleRequest({
      setLoading: setIsLoadingProducto,
      setError: setProductoError,
      onAuthError: () => navigate("/shop"),
      errorFallback: "Error al cargar producto",
      request: () => getProductoAsync(id),
    });

    if (data) setProducto(data);
    return data !== null;
  }, [navigate]);

  const clearProductoError = () => setProductoError(null);

  return {
    producto,
    isLoadingProducto,
    productoError,
    clearProductoError,
    fetchProducto,
  };
};