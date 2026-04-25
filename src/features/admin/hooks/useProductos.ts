import { useEffect, useState } from "react";
import { getProductosAsync, getProductoAsync } from "../services/ProductApi";
import type { ProductosResponse, ProductoResponse } from "../../../types/responses/ProductResponses";
import { AuthError } from "../../../errors/AuthError";
import { useNavigate } from "react-router-dom";

export const useProductos = () => {

  const navigate = useNavigate();
  const [producto, setProducto] = useState<ProductoResponse | null>(null);
  const [productos, setProductos] = useState<ProductosResponse | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProducto = async (id: number) => {
    try {
      const data = await getProductoAsync(id);

      setProducto(data);
    } catch (error) {
      if (error instanceof AuthError) {
        navigate("/shop");
      } else {
        console.error("Error al cargar productos:", error);
      }
    }
  };

  const fetchProductos = async () => {
    try {
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
        console.error("Error al cargar productos:", error);
      }
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [page, search]);

  return {
    productos,
    producto,
    page,
    setPage,
    search,
    setSearch,
    refetch: fetchProductos,
    refetchProducto: fetchProducto
  };
};