// src/errors/ValidationError.ts

import { ApiError, type FieldErrors } from "./ApiError";

export class ValidationError extends ApiError {
  fieldErrors: FieldErrors;

  constructor(
    message = "Hay errores de validacion",
    fieldErrors: FieldErrors = {},
    details?: unknown
  ) {
    super({ message, status: 400, details });
    this.name = "ValidationError";
    this.fieldErrors = fieldErrors;
  }
}
