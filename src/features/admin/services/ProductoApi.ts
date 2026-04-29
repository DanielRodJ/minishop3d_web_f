// src/features/admin/services/ProductoApi.ts

import { api } from "../../../services/ApiClient";
import type { AddProductoCommand, UpdateProductoCommand } from "../../../types/ProductCommand";
import type { BaseQueryParams } from "../../../types/BaseQueryParams";
import type { ProductoDetalladoResponse, ProductosResponse } from "../../../types/responses/ProductResponses";

export type AddProductResponse = {
  productId: number;
};

export const getProductoAsync = async (id: number) => {
  const response = await api.private(`/minisho3d/producto/${id}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener el producto");
  }

  return response.json() as Promise<ProductoDetalladoResponse>;
}

export const addProductoAsync = async (
  data: AddProductoCommand
): Promise<AddProductResponse> => {

  const response = await api.private(`/minisho3d/producto`, {
    method: "POST",
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al agregar el producto");
  }

  return response.json() as Promise<AddProductResponse>;
};

export const updateProductoAsync = async (
  data: UpdateProductoCommand
): Promise<UpdateProductoCommand> => {
  const response = await api.private(`/minisho3d/producto/${data.productoId}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al actualizar el producto");
  }

  return response.json() as Promise<UpdateProductoCommand>;
};

export const getProductosAsync = async (
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

  const response = await api.private(
    `/minisho3d/producto/productos?${query.toString()}`
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener productos");
  }

  return response.json() as Promise<ProductosResponse>;
};