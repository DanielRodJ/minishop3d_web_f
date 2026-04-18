import { api } from "../../../services/ApiClient";

export type LoginResponse = {
  success: boolean;
};

export const loginWithBackend = async (): Promise<LoginResponse> => {
  const response = await api.private("/minisho3d/auth/login", {
    method: "POST"
  });

  return response.json();
};