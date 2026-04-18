// src/services/ApiCatalogs.ts
import { api } from "./ApiClient";

export type CatalogoResponse = {
    nombre: string;
    codigo: string;
};

export const getAcabadosMaterial = async (): Promise<CatalogoResponse[]> => {
    const response = await api.public("/minisho3d/catalogo/acabados-material");

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al obtener acabados de material");
    }

    return response.json() as Promise<CatalogoResponse[]>;
}

export const getColoresFilamento = async (): Promise<CatalogoResponse[]> => {
    const response = await api.public("/minisho3d/catalogo/colores-filamento");

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al obtener colores de filamento");
    }

    return response.json() as Promise<CatalogoResponse[]>;
}

export const getEscalas = async (): Promise<CatalogoResponse[]> => {
    const response = await api.public("/minisho3d/catalogo/escalas");

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al obtener escalas");
    }

    return response.json() as Promise<CatalogoResponse[]>;
}

export const getEstadosProducto = async (): Promise<CatalogoResponse[]> => {
    const response = await api.public("/minisho3d/catalogo/estados-producto");

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al obtener estados de producto");
    }

    return response.json() as Promise<CatalogoResponse[]>;
}

export const getTiposProducto = async (): Promise<CatalogoResponse[]> => {
    const response = await api.public("/minisho3d/catalogo/tipos-producto");

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al obtener tipos de producto");
    }

    return response.json() as Promise<CatalogoResponse[]>;
}