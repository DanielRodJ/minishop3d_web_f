// src/types/ProductoCommands.ts

export interface AddProductoCommand {
  nombreProducto: string;
  descripcionProducto: string;
  autorNombre?: string;
  fechaLanzamiento: string;
  coleccionId?: number;
}

export interface UpdateProductoCommand extends AddProductoCommand {
  productoId: number;
}