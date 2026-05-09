// src/errors/ApiError.ts

export type FieldErrors = Record<string, string>;

type ApiErrorOptions = {
  message: string;
  status?: number;
  details?: unknown;
};

export class ApiError extends Error {
  status?: number;
  details?: unknown;

  constructor({ message, status, details }: ApiErrorOptions) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export const getErrorMessage = (
  error: unknown,
  fallback = "Ocurrio un error inesperado"
) => {
  if (error instanceof Error) return error.message;
  return fallback;
};
