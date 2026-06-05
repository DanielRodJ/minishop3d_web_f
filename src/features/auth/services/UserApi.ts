// src/features/auth/services/UserApi.ts

import { api } from "@/services/apiClient";

export type UsuarioBaseDto = {
    usuarioId: number;
    nombre?: string
    email: string;
    esAdmin: boolean;
    isDeleted: boolean;
};

export const getMiUsuarioAsync = async (): Promise<UsuarioBaseDto> => {
    const response = await api.private(`/minisho3d/user/me`, {
        method: "GET"
    });

    return response.json();
};