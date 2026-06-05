// src/types/PublicacionCommand.ts

export interface AddPublicacionCommand {
  tituloPublicacion: string;
  descripcionPublicacion: string;
  productoId: number;
  estadoPublicacionCodigo: string;
  destacado: boolean;
}

export interface UpdatePublicacionCommand extends AddPublicacionCommand {
  publicacionId: number;
}
