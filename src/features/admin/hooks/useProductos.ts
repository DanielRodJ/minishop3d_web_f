// src/features/admin/hooks/useProductos.ts

import { useCallback, useEffect, useState } from "react";
import { getProductosAsync, getProductoAsync } from "../services/ProductoApi";
import type { ProductosResponse, ProductoDetalladoResponse } from "../../../types/responses/ProductResponses";
import { AuthError } from "../../../errors/AuthError";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../errors/ApiError";

export const useProductos = () => {

  const navigate = useNavigate();

  const [producto, setProducto] = useState<ProductoDetalladoResponse | null>(null);
  const [productos, setProductos] = useState<ProductosResponse | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProducto, setIsLoadingProducto] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [productoError, setProductoError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProducto = useCallback(async (id: number) => {
    try {
      setIsLoadingProducto(true);
      setProductoError(null);

      const data = await getProductoAsync(id);

      setProducto(data);
      return true;
    } catch (error) {
      if (error instanceof AuthError) {
        navigate("/shop");
      } else {
        setProductoError(getErrorMessage(error, "Error al cargar producto"));
      }

      return false;
    } finally {
      setIsLoadingProducto(false);
    }
  }, [navigate]);

  const fetchProductos = useCallback(async () => {
    try {

      setIsLoading(true)
      setError(null);

      const data = await getProductosAsync({
        pageNumber: page,
        pageSize: 10,
        searchTerm: search,
        sortBy: "nombre",
        sortDescending: false
      });

      setProductos(data);

    } catch (error) {
      if (error instanceof AuthError) {
        navigate("/shop");
      } else {
        setError(getErrorMessage(error, "Error al cargar productos"))
      }
    } finally {
      setIsLoading(false)
    }
  }, [navigate, page, search]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const clearProductoError = () => {
    setProductoError(null);
  };

  return {
    productos,
    producto,
    isLoading,
    isLoadingProducto,
    error,
    productoError,
    clearProductoError,
    page,
    setPage,
    search,
    setSearch,
    refetch: fetchProductos,
    refetchProducto: fetchProducto
  };
};
