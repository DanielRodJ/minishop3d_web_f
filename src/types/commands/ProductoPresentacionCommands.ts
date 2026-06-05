// src/types/commands/ProductoPresentacionCommmands.ts

export interface AddProductoPresentacionCommand {
  productoId: number;
  filamentoId: number;
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
}

export interface UpdateProductoPresentacionCommand
  extends AddProductoPresentacionCommand {
  productoPresentacionId: number;
}

export type CalculateProductoPresentacionCommand = Pick<
  AddProductoPresentacionCommand,
  | "filamentoId"
  | "escalaCodigo"
  | "tiempoImpresionMinutos"
  | "cantidadGramosFilamentoUso"
  | "costoProduccionAdicional"
>;
