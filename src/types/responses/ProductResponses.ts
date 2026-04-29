// src/types/responses/ProductResponses.ts

import type { BasePagedDto } from "../BasePagedDto";

export type ProductoBaseDto = {
    productoId: number;
    nombreProducto: string;
    autorNombre?: string;
    fechaLanzamiento: string;
    coleccionId?: number;
    coleccion?: {
        coleccionId: number;
        nombre: string;
    };
    isDeleted: boolean;
};

export type ProductoDetalladoDto = ProductoBaseDto & {
    descripcionProducto: string;
    escalaBase: string;
    costoProduccionBase: number;
    filamentoUsoBase: number;
};

export type ProductosResponse = BasePagedDto<ProductoBaseDto>;
export type ProductoResponse = ProductoBaseDto;
export type ProdusctosDetalladosResponse = BasePagedDto<ProductoDetalladoDto>;
export type ProductoDetalladoResponse = ProductoDetalladoDto;