// src/features/admin/services/ApiProductoPresentacion.ts

import { api } from "@/services/apiClient";

import type { BaseQueryParams } from "@/types/shared/BaseQueryParams";

import type {
    AddProductoPresentacionCommand,
    CalculateProductoPresentacionCommand,
    UpdateProductoPresentacionCommand
} from "@/types/commands/ProductoPresentacionCommands";

import type { ProductoPresentacionResponse } from "@/types/responses/ProductoPresentacionResponses";

type ResponseTemporal = {
}

const BASE_PATH = "/minisho3d/producto-presentacion";

export const getProductoPresentacionAsync = (id: number) => {
    return api.request<ResponseTemporal>(
        api.private(`${BASE_PATH}/${id}`),
        "Error al obtener la presentación"
    );
};

export const addProductoPresentacionAsync = (data: AddProductoPresentacionCommand) => {
    return api.request<ProductoPresentacionResponse>(
        api.private(`${BASE_PATH}`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
        "Error al agregar la presentacion"
    );
};

export const updateProductoPresentacionAsync = (data: UpdateProductoPresentacionCommand) => {
    return api.request<boolean>(
        api.private(`${BASE_PATH}/${data.productoPresentacionId}`, {
            method: "PUT",
            body: JSON.stringify(data)
        }),
        "Error al actualizar la presentacion"
    );
};

export const getProductosPresentacionesAsync = (
    params?: BaseQueryParams
): Promise<ResponseTemporal> => {
    const query = new URLSearchParams();

    if (params?.pageNumber) query.append("pageNumber", params.pageNumber.toString());
    if (params?.pageSize) query.append("pageSize", params.pageSize.toString());
    if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
    if (params?.filterBy) query.append("filterBy", params.filterBy);
    if (params?.sortBy) query.append("sortBy", params.sortBy);
    if (params?.sortDescending !== undefined) {
        query.append("sortDescending", params.sortDescending.toString());
    }

    return api.request<ResponseTemporal>(
        api.private(`${BASE_PATH}/productos?${query.toString()}`),
        "Error al obtener productos"
    );
};

export const calculateProductoPresentacionAsync = (data: CalculateProductoPresentacionCommand) => {
    return api.request<number>(
        api.private(`${BASE_PATH}/calculate-presentacion`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
        "Error al calcular el precio de venta"
    );
}