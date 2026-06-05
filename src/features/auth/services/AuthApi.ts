// src/features/auth/services/AuthApi.ts

import { api } from "@/services/apiClient";

export type LoginResponse = {
  success: boolean;
};

export const loginWithBackend = async (): Promise<LoginResponse> => {
  const response = await api.private("/minisho3d/auth/login", {
    method: "POST"
  });

  return response.json();
};