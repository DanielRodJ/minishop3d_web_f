// src/types/responses/UsuarioResponses.ts

export type UsuarioBaseResponse = {
    usuarioId: number;
    nombre?: string
    email: string;
    esAdmin: boolean;
    isDeleted: boolean;
};