// src/types/responses/ProductoResponses.ts

import type { BasePagedResponse } from "@/types/shared/BasePagedResponse";
import type { ProductoPresentacionResponse } from "@/types/responses/ProductoPresentacionResponses";

export type ProductoResponse = {
  productoId: number;
  coleccionId?: number;
  nombreProducto: string;
  autorNombre?: string;
  fechaLanzamiento: string;
  isDeleted: boolean;
};

export type ProductoDetalladoResponse = ProductoResponse & {
  descripcionProducto: string;
  productoPresentaciones?: ProductoPresentacionResponse[];
};

export type ProductoIdResponse = {
  productoId: number;
};

export type CantidadPresentacionesResponse = {
  productoId: number;
  cantidadTotalPresentaciones: number;
  cantidadPresentacionesEnEstadoDisponible: number;
};

export type CantidadesPresentacionesResponse = CantidadPresentacionesResponse[];

export type ProductosResponse = BasePagedResponse<ProductoResponse>;
export type ProductosDetalladosResponse = BasePagedResponse<ProductoDetalladoResponse>;