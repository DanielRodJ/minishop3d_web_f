// src/features/admin/hooks/catalogos/useCatalogos.ts

// Librerías externas.
import { useQuery } from "@tanstack/react-query";

// Servicios.
import {
  getEscalas,
  getEstadosProducto,
  getEstadosPublicacion,
  getFilamentos
} from "@/services/apiCatalogo";

// Utils.
import { getErrorMessage } from "@/errors/ApiError";

// Types.
import type { CatalogoResponse } from "@/types/responses/CatalogoResponses";
import type { FilamentoResponse } from "@/types/responses/FilamentoResponses";

const CATALOG_STALE_TIME = 60 * 60 * 1000;

export const useCatalogos = () => {

  // GetEscalasQuery.
  const escalasQuery = useQuery<CatalogoResponse[], Error>({
    queryKey: ["catalogo", "escalas"],
    queryFn: getEscalas,
    staleTime: CATALOG_STALE_TIME
  });

  // GetEstadosProductoQuery.
  const estadosProductoQuery = useQuery<CatalogoResponse[], Error>({
    queryKey: ["catalogo", "estados-producto"],
    queryFn: getEstadosProducto,
    staleTime: CATALOG_STALE_TIME
  });

  // GetEstadosPublicacionQuery.
  const estadosPublicacionQuery = useQuery<CatalogoResponse[], Error>({
    queryKey: ["catalogo", "estados-publicacion"],
    queryFn: getEstadosPublicacion,
    staleTime: CATALOG_STALE_TIME
  });

  // GetFilamentosQuery.
  const filamentosQuery = useQuery<FilamentoResponse[], Error>({
    queryKey: ["catalogo", "filamentos"],
    queryFn: getFilamentos,
    staleTime: CATALOG_STALE_TIME
  });

  const error =
    escalasQuery.error ??
    estadosProductoQuery.error ??
    estadosPublicacionQuery.error ??
    filamentosQuery.error;

  return {
    escalas: escalasQuery.data ?? null,
    estadosProducto: estadosProductoQuery.data ?? null,
    estadosPublicacion: estadosPublicacionQuery.data ?? null,
    filamentos: filamentosQuery.data ?? null,
    isLoadingEscalas: escalasQuery.isLoading,
    isLoadingEstadosProducto: estadosProductoQuery.isLoading,
    isLoadingEstadosPublicacion: estadosPublicacionQuery.isLoading,
    isLoadingFilamentos: filamentosQuery.isLoading,
    catalogosError: error
      ? getErrorMessage(error, "Error al cargar catálogos")
      : null,
  };
};