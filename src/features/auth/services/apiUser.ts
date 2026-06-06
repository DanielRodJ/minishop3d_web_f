// src/features/auth/services/apiUser.ts

// Servicios.
import { api } from "@/services/apiClient";

// Types.
import type { UsuarioBaseResponse } from "@/types/responses/UsuarioResponses";

export const getMiUsuarioAsync = async (): Promise<UsuarioBaseResponse> => {
    const response = await api.private(`/minisho3d/user/me`, {
        method: "GET"
    });

    return response.json();
};