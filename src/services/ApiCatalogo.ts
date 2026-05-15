// src/services/ApiCatalogs.ts

import { api } from "@/services/ApiClient";
import type { FilamentoResponse } from "@/types/responses/FilamentoResponses";

export type CatalogoResponse = {
  nombre: string;
  codigo: string;
  numero?: number;
};

const CATALOG_BASE = "/minisho3d/catalogo";

export const getEscalas = () =>
  api.request<CatalogoResponse[]>(
    api.public(`${CATALOG_BASE}/escalas`),
    "Error al obtener escalas"
  );

export const getEstadosProducto = () =>
  api.request<CatalogoResponse[]>(
    api.public(`${CATALOG_BASE}/estados-producto`),
    "Error al obtener estados de producto"
  );

export const getEstadosPublicacion= () =>
  api.request<CatalogoResponse[]>(
    api.public(`${CATALOG_BASE}/estados-publicacion`),
    "Error al obtener estados de publicacion"
  );

export const getFilamentos = () =>
  api.request<FilamentoResponse[]>(
    api.private("/minisho3d/filamento/lista-filamentos"),
    "Error al obtener lista de filamentos"
  );
