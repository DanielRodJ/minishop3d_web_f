// src/types/responses/ProductoPresentacionResponses.ts

import type { FilamentoResponse } from "@/types/responses/FilamentoResponses";
import type { BasePagedResponse } from "@/types/shared/BasePagedResponse";

export type ProductoPresentacionResponse = {
  productoPresentacionId: number;
  productoId: number;
  filamentoId: number;
  filamento?: FilamentoResponse;
  escalaCodigo: string;
  dimensionX: number;
  dimensionY: number;
  dimensionZ: number;
  tiempoImpresionMinutos: number;
  cantidadGramosFilamentoUso: number;
  estadoProductoPresentacionCodigo: string;
  stock: number;
  costoProduccionAdicional: number;
  precioVenta: number;
};
 
export type ProductoPresentacionesResponse = BasePagedResponse<ProductoPresentacionResponse>;