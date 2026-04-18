export interface AddProductCommand {
  nombreProducto: string;
  descripcionProducto: string;
  escalaBase: string;
  costoProduccionBase: number;
  filamentoUsoBase: number;
  autorNombre?: string;
  fechaLanzamiento: string;
  coleccionId?: number;
}

export interface UpdateProductCommand extends AddProductCommand {
  productoId: number;
}