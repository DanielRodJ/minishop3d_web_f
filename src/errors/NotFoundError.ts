// src/errors/NotFoundError.ts

import { ApiError } from "./ApiError";

export class NotFoundError extends ApiError {
  constructor(message = "No se encontro el recurso solicitado", details?: unknown) {
    super({ message, status: 404, details });
    this.name = "NotFoundError";
  }
}
