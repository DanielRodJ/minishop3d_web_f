// AuthError.ts

export class AuthError extends Error {
  constructor(message = "No autenticado") {
    super(message);
    this.name = "AuthError";
  }
}