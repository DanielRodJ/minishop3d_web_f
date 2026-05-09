// src/services/ApiClient

import { auth } from "./Firebase";
import { ApiError } from "@/errors/ApiError";
import { AuthError } from "@/errors/AuthError";
import { throwApiError } from "@/errors/throwApiError";

const BASE_URL =  import.meta.env.VITE_API_URL;

export const api = {
  public: apiFetchPublic,
  private: apiFetchPrivate,
  request
}

async function apiFetch(
  url: string,
  options: RequestInit = {},
  token?: string
) {
  try {

    return await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.body && { "Content-Type": "application/json" })
      }
    });
  } catch {
    // Solo captura errores de red (pérdida de conexión, DNS, etc.)
    throw new ApiError({
      message: "No se pudo conectar con el servidor"
    });
  }
}

async function apiFetchPublic(
  url: string,
  options: RequestInit = {}
) {
  return apiFetch(url, options);
}

async function apiFetchPrivate(url: string, options: RequestInit = {}) {
  const token = await auth.currentUser?.getIdToken()
  if (!token) {
    throw new AuthError();
  }
  return apiFetch(url, options, token);
}

async function request<T>(
  responsePromise: Promise<Response>,
  fallback: string
): Promise<T> {

  const response = await responsePromise;

  if (!response.ok) {
    await throwApiError(response, fallback);
  }

  return response.json() as Promise<T>;
}