// src/types/responses/ProductResponses.ts

import type { BasePagedResponse } from "@/types/BasePagedResponse";

export type ProductoResponse = {
    productoId: number;
    coleccionId?: number;
    nombreProducto: string;
    autorNombre?: string;
    fechaLanzamiento: string;
    isDeleted: boolean;
};

export type ProductoDetalladoResponse = {
    productoId: number;
    nombreProducto: string;
    descripcionProducto: string;
    autorNombre?: string;
    fechaLanzamiento: string;
    isDeleted: boolean;
}

export type ProductoPresentacionResponse ={

}

export type ProductosResponse = BasePagedResponse<ProductoResponse>;
export type ProductosDetalladosResponse = BasePagedResponse<ProductoDetalladoResponse>;