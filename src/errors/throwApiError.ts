// src/errors/throwApiError.ts

import { ApiError, type FieldErrors } from "./ApiError";
import { AuthError } from "./AuthError";
import { ConflictError } from "./ConflictError";
import { NotFoundError } from "./NotFoundError";
import { ValidationError } from "./ValidationError";

type ProblemDetails = {
  title?: string;
  detail?: string;
  message?: string;
  errors?: Record<string, string[] | string>;
};

const readResponseBody = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      return response.json();
    }

    const text = await response.text();
    return text || null;
  } catch {
    return null;
  }
};

const getMessage = (body: unknown, fallback: string) => {
  if (typeof body === "string") return body || fallback;
  if (!body || typeof body !== "object") return fallback;

  const problem = body as ProblemDetails;
  return problem.detail ?? problem.message ?? problem.title ?? fallback;
};

const getFieldErrors = (body: unknown): FieldErrors => {
  if (!body || typeof body !== "object") return {};

  const errors = (body as ProblemDetails).errors;
  if (!errors) return {};

  return Object.entries(errors).reduce<FieldErrors>((acc, [field, value]) => {
    acc[field] = Array.isArray(value) ? value[0] : value;
    return acc;
  }, {});
};

export const throwApiError = async (
  response: Response,
  fallbackMessage = "Ocurrio un error al comunicarse con el servidor"
): Promise<never> => {
  const body = await readResponseBody(response);
  const message = getMessage(body, fallbackMessage);

  if (response.status === 401 || response.status === 403) {
    throw new AuthError(message);
  }

  if (response.status === 400 || response.status === 422) {
    throw new ValidationError(message, getFieldErrors(body), body);
  }

  if (response.status === 404) {
    throw new NotFoundError(message, body);
  }

  if (response.status === 409) {
    throw new ConflictError(message, body);
  }

  throw new ApiError({
    message,
    status: response.status,
    details: body
  });
};
