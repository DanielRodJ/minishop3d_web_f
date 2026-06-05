// src/types/responses/PublicacionResponses.ts

import type { BasePagedResponse } from "@/types/shared/BasePagedResponse";

export type PublicacionResponse = {
  publicacionId: number;
  productoId: number;
  titulo: string;
  descripcion: string;
  estadoPublicacionCodigo: string;
  destacado: boolean;
  fechaPublicacion?: string | null;
  slug: string;
  isDeleted: boolean;
};

export type PublicacionIdResponse = {
  publicacionId: number;
};

export type PublicacionesResponse = BasePagedResponse<PublicacionResponse>;
