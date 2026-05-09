// src/features/admin/services/ProductoApi.ts

import { api } from "@/services/ApiClient";

import type { BaseQueryParams } from "@/types/BaseQueryParams";
import type { AddProductoCommand, UpdateProductoCommand } from "@/types/ProductCommand";
import type { ProductoDetalladoResponse, ProductosResponse } from "@/types/responses/ProductResponses";

const BASE_PATH = "/minisho3d/producto";

export type ProductoIdResponse = {
  productId: number;
};

export const getProductoAsync = (id: number) => {
  return api.request<ProductoDetalladoResponse>(
    api.private(`${BASE_PATH}/${id}`),
    "Error al obtener el producto"
  );
};

export const addProductoAsync = (
  data: AddProductoCommand
) => {

  return api.request<ProductoIdResponse>(
    api.private(BASE_PATH, {
      method: "POST",
      body: JSON.stringify(data)
    }),
    "Error al agregar el producto"
  );
};

export const updateProductoAsync = (
  data: UpdateProductoCommand
) => {
  return api.request<boolean>(
    api.private(`${BASE_PATH}/${data.productoId}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
    "Error al actualizar el producto"
  )
}

export const getProductosAsync = (
  params?: BaseQueryParams
): Promise<ProductosResponse> => {
  const query = new URLSearchParams();

  if (params?.pageNumber) query.append("pageNumber", params.pageNumber.toString());
  if (params?.pageSize) query.append("pageSize", params.pageSize.toString());
  if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
  if (params?.filterBy) query.append("filterBy", params.filterBy);
  if (params?.sortBy) query.append("sortBy", params.sortBy);
  if (params?.sortDescending !== undefined)
    query.append("sortDescending", params.sortDescending.toString());

  return api.request<ProductosResponse>(
    api.private(
      `${BASE_PATH}/productos?${query.toString()}`
    ),
    "Error al obtener productos"
  );
};
