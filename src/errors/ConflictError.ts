// src/errors/ConflictError.ts

import { ApiError } from "./ApiError";

export class ConflictError extends ApiError {
  constructor(message = "El recurso ya existe o esta en conflicto", details?: unknown) {
    super({ message, status: 409, details });
    this.name = "ConflictError";
  }
}
