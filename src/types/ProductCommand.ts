export interface AddProductoCommand {
  nombreProducto: string;
  descripcionProducto: string;
  escalaBase: string;
  costoProduccionBase: number;
  filamentoUsoBase: number;
  autorNombre?: string;
  fechaLanzamiento: string;
  coleccionId?: number;
}

export interface UpdateProductoCommand extends AddProductoCommand {
  productoId: number;
}