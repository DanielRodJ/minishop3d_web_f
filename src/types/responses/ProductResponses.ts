import type { BasePagedDto } from "../BasePagedDto";

export type ProductoBaseDto = {
    productoId: number;
    coleccionId?: number | null;
    coleccion?: {
        coleccionId: number;
        nombre: string;
    } | null;
    nombre: string;
    autorNombre?: string | null;
    fechaLanzamiento: string;
    isDeleted: boolean;
};


export type ProductosResponse = BasePagedDto<ProductoBaseDto>;
export type ProductoResponse = ProductoBaseDto;