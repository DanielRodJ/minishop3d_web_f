import { api } from "../../../services/ApiClient";

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