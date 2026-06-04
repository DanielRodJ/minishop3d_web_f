// src/features/admin/hooks/useProductPresentationForms.ts

// Librerías externas.
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Hooks.
import { useFormBase } from "@/features/admin/hooks/useFormBase";

// Schemas.
import {
    addProductoPresentacionSchema,
    updateProductoPresentacionSchema
} from "@/features/admin/schemas/productSchemas";

// Servicios.
import {
    addProductoPresentacionAsync,
    calculateProductoPresentacionAsync,
    updateProductoPresentacionAsync
} from "@/features/admin/services/ApiProductoPresentacion";

// Utils.
import { getErrorMessage } from "@/errors/ApiError";
import { ValidationError } from "@/errors/ValidationError";

import {
    getApiFieldErrors,
    getZodFieldErrors
} from "@/features/admin/utils/formErrorsUtils";

// Types.
import type {
    AddProductoPresentacionCommand,
    UpdateProductoPresentacionCommand
} from "@/types/ProductoPresentacionCommands";

// campos númericos
const numericFields = new Set([
    "productoId",
    "productoPresentacionId",
    "filamentoId",
    "dimensionX",
    "dimensionY",
    "dimensionZ",
    "tiempoImpresionMinutos",
    "cantidadGramosFilamentoUso",
    "stock",
    "costoProduccionAdicional",
    "precioVenta",
    "coleccionId"
]);

// creación de estado inicial vacío de ProductoPresentacion.
export const getInitialProductoPresentacion = (
    productoId: number
): AddProductoPresentacionCommand => ({
    productoId,
    filamentoId: 0,
    escalaCodigo: "",
    dimensionX: 0,
    dimensionY: 0,
    dimensionZ: 0,
    tiempoImpresionMinutos: 0,
    cantidadGramosFilamentoUso: 0,
    estadoProductoPresentacionCodigo: "",
    stock: 0,
    costoProduccionAdicional: 0,
    precioVenta: 0
});

// prop para definición de operación post éxito.
type SubmitProps = {
    onSuccess?: () => void | Promise<void>;
};

type AddPresentacionProps = SubmitProps & {
    productoId: number;
};

// hook para manejo completo del formulario de creación de presentaciones:
// estado, validación, envío y manejo de errores.
export const useAddProductoPresentacionMutation = ({
    productoId,
    onSuccess
}: AddPresentacionProps) => {

    const queryClient = useQueryClient();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        formData,
        setFormData,
        fieldErrors,
        setFieldErrors,
        handleChange,
        handleSelectChange
    } = useFormBase<AddProductoPresentacionCommand>({
        initialState: getInitialProductoPresentacion(productoId),
        numericFields
    });

    // para cambio de entidad sobre la que se consultan las presentaciones.
    useEffect(() => {
        setFormData(getInitialProductoPresentacion(productoId));
        setFieldErrors({});
        setSubmitError(null);
    }, [productoId, setFormData, setFieldErrors]);

    const addPresentacionMutation = useMutation({
        mutationFn: addProductoPresentacionAsync,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["producto", productoId, "presentaciones-listado"] });
            await queryClient.invalidateQueries({ queryKey: ["productos", "cantidades-presentaciones"] });
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);
        setFieldErrors({});

        const result = addProductoPresentacionSchema.safeParse(formData);

        if (!result.success) {
            setFieldErrors(getZodFieldErrors(result.error));
            return;
        }

        try {
            await addPresentacionMutation.mutateAsync(formData);
            await onSuccess?.();
            setFormData(getInitialProductoPresentacion(productoId));
        } catch (error) {
            if (error instanceof ValidationError) {
                setFieldErrors(getApiFieldErrors(error));
            }

            setSubmitError(getErrorMessage(error, "Error al crear presentacion"));
        }
    };

    const calculateMutation = useMutation({
        mutationFn: calculateProductoPresentacionAsync
    });

    const handleCalculatePrice = async () => {
        setSubmitError(null);

        try {
            const precioVenta = await calculateMutation.mutateAsync({
                filamentoId: formData.filamentoId,
                escalaCodigo: formData.escalaCodigo,
                tiempoImpresionMinutos: formData.tiempoImpresionMinutos,
                cantidadGramosFilamentoUso: formData.cantidadGramosFilamentoUso,
                costoProduccionAdicional: formData.costoProduccionAdicional
            });

            setFormData(prev => ({
                ...prev,
                precioVenta
            }));

        } catch (error) {
            setSubmitError(
                getErrorMessage(
                    error,
                    "Error al calcular precio de venta"
                )
            );
        }
    };

    return {
        formData,
        fieldErrors,
        submitError,

        handleChange,
        handleSelectChange,
        handleSubmit,
        handleCalculatePrice,

        isSubmitting: addPresentacionMutation.isPending,
        isCalculating: calculateMutation.isPending
    };
};

type UpdatePresentacionProps = SubmitProps & {
    initialData: UpdateProductoPresentacionCommand;
};

export const useUpdateProductoPresentacionMutation = ({
    initialData,
    onSuccess
}: UpdatePresentacionProps) => {

    const [submitError, setSubmitError] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const {
        formData,
        setFormData,
        fieldErrors,
        setFieldErrors,
        handleChange,
        handleSelectChange
    } = useFormBase<UpdateProductoPresentacionCommand>({
        initialState: initialData,
        numericFields
    });

    useEffect(() => {
        setFormData(initialData);
        setFieldErrors({});
        setSubmitError(null);
    }, [initialData, setFormData, setFieldErrors]);

    const updatePresentacionMutation = useMutation({
        mutationFn: updateProductoPresentacionAsync,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["producto", initialData.productoId, "presentaciones-listado"] });
            await queryClient.invalidateQueries({ queryKey: ["productos", "cantidades-presentaciones"] });
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);
        setFieldErrors({});

        const result = updateProductoPresentacionSchema.safeParse(formData);

        if (!result.success) {
            setFieldErrors(getZodFieldErrors(result.error));
            return;
        }

        try {
            await updatePresentacionMutation.mutateAsync(formData);
            await onSuccess?.();
        } catch (error) {
            if (error instanceof ValidationError) {
                setFieldErrors(getApiFieldErrors(error));
            }

            setSubmitError(getErrorMessage(error, "Error al actualizar presentacion"));
        }
    };


    const calculateMutation = useMutation({
        mutationFn: calculateProductoPresentacionAsync
    });

    const handleCalculatePrice = async () => {

        setSubmitError(null);

        try {
            const precioVenta = await calculateMutation.mutateAsync({
                filamentoId: formData.filamentoId,
                escalaCodigo: formData.escalaCodigo,
                tiempoImpresionMinutos: formData.tiempoImpresionMinutos,
                cantidadGramosFilamentoUso: formData.cantidadGramosFilamentoUso,
                costoProduccionAdicional: formData.costoProduccionAdicional
            });

            setFormData(prev => ({
                ...prev,
                precioVenta
            }));

        } catch (error) {

            setSubmitError(
                getErrorMessage(
                    error,
                    "Error al calcular precio de venta"
                )
            );

        }
    };

    return {
        formData,
        fieldErrors,
        submitError,
        handleChange,
        handleSelectChange,
        handleSubmit,
        handleCalculatePrice,
        isSubmitting: updatePresentacionMutation.isPending,
        isCalculating: calculateMutation.isPending
    };
};