// src/errors/AuthError.ts

import { ApiError } from "./ApiError";

export class AuthError extends ApiError {
  constructor(message = "No autenticado") {
    super({ message, status: 401 });
    this.name = "AuthError";
  }
}