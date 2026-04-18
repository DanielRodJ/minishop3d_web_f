import { useEffect, useState } from "react";
import { getProductosAsync } from "../services/ProductApi";
import type { ProductResponse } from "../../../types/responses/ProductResponses";
import { AuthError } from "../../../errors/AuthError";
import { useNavigate } from "react-router-dom";

export const useProductos = () => {
  const navigate = useNavigate();

  const [productos, setProductos] = useState<ProductResponse | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

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
    page,
    setPage,
    search,
    setSearch,
    refetch: fetchProductos
  };
};