// src/types/commands/PublicacionCommands.ts

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

export interface UpdateEstadoPublicacionCommand {
  productoId: number;
  estadoPublicacionCodigo: string;
}