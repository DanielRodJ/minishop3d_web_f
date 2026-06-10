// src/features/admin/services/apiPublicacion.ts

// Servicios.
import { api } from "@/services/apiClient";

// Types.
import type {
  AddPublicacionCommand,
  UpdateEstadoPublicacionCommand,
  UpdatePublicacionCommand
} from "@/types/commands/PublicacionCommands";

import type { ProductoResponse } from "@/types/responses/ProductoResponses";

import type {
  PublicacionIdResponse,
  PublicacionResponse,
  PublicacionesResponse
} from "@/types/responses/PublicacionResponses";

import type { BaseQueryParams } from "@/types/shared/BaseQueryParams";

const BASE_PATH = "/minisho3d/publicacion";

export const getPublicacionAsync = (id: number) => {
  return api.request<PublicacionResponse>(
    api.private(`${BASE_PATH}/${id}`),
    "Error al obtener la publicación"
  );
};

export const addPublicacionAsync = (data: AddPublicacionCommand) => {
  return api.request<PublicacionIdResponse>(
    api.private(BASE_PATH, {
      method: "POST",
      body: JSON.stringify(data)
    }),
    "Error al agregar la publicación"
  );
};

export const updatePublicacionAsync = (data: UpdatePublicacionCommand) => {
  return api.request<boolean>(
    api.private(`${BASE_PATH}/${data.publicacionId}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
    "Error al actualizar la publicación"
  );
};

export const getPublicacionesAsync = (
  params?: BaseQueryParams
): Promise<PublicacionesResponse> => {
  const query = new URLSearchParams();

  if (params?.pageNumber) query.append("pageNumber", params.pageNumber.toString());
  if (params?.pageSize) query.append("pageSize", params.pageSize.toString());
  if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
  if (params?.filterBy) query.append("filterBy", params.filterBy);
  if (params?.sortBy) query.append("sortBy", params.sortBy);
  if (params?.sortDescending !== undefined) {
    query.append("sortDescending", params.sortDescending.toString());
  }

  return api.request<PublicacionesResponse>(
    api.private(`${BASE_PATH}/publicaciones?${query.toString()}`),
    "Error al obtener publicaciones"
  );
};

export const updateEstadoPublicacionAync = (data: UpdateEstadoPublicacionCommand) => {
  return api.request<ProductoResponse>(
    api.private(`${BASE_PATH}/actualizar-estado`, {
      method: "PATCH",
      body: JSON.stringify(data)
    }),
    "Error al actualizar la publicación"
  );
};