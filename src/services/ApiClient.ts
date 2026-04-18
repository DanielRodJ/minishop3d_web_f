import { AuthError } from "../errors/AuthError"
import { auth } from "./Firebase"

export const api = {
  public: apiFetchPublic,
  private: apiFetchPrivate
}

export async function apiFetchPublic(url: string, options: RequestInit = {}) {
  return fetch(`https://localhost:7182${url}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(options.body && { "Content-Type": "application/json" }),
    }
  })
}

export async function apiFetchPrivate(url: string, options: RequestInit = {}) {

  const token = await auth.currentUser?.getIdToken()

  if (!token) {
    throw new AuthError();
  }

  return fetch(`https://localhost:7182${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      ...(options.body && { "Content-Type": "application/json" }),
    }
  })
}