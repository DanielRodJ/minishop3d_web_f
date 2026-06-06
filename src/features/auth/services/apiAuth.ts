// src/features/auth/services/apiAuth.ts

// Servicios.
import { api } from "@/services/apiClient";

// Types.
import type { LoginResponse } from "@/types/responses/LoginResponse";

export const loginWithBackend = async (): Promise<LoginResponse> => {
  const response = await api.private("/minisho3d/auth/login", {
    method: "POST"
  });

  return response.json();
};