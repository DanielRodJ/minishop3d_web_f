// src/features/admin/hooks/useFormMutations.ts

// Librerías externas.
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod"

// Errores.
import { getErrorMessage } from "@/errors/ApiError";
import { ValidationError } from "@/errors/ValidationError";

// Servicios.
import { useFormBase } from "@/features/admin/hooks/useFormBase";

// Utils.
import {
    getApiFieldErrors,
    getZodFieldErrors
} from "@/features/admin/utils/formErrorsUtils";

type UseFormMutationOptions<TCommand, TData> = {
    schema: z.ZodType<TCommand>;
    mutationFn: (data: TCommand) => Promise<TData>;
    initialData: TCommand;
    numericFields?: Set<string>;
    queryKeysToInvalidate?: string[][];
    onSuccess?: (data: TData) => void | Promise<void>;
};

export const useFormMutation = <
    TCommand extends object, // tipo de datos que se envía al backend.
    TData, // tipo de respuesta que devuelve
>({
    schema,
    mutationFn,
    initialData,
    numericFields = new Set(),
    queryKeysToInvalidate = [],
    onSuccess,
}: UseFormMutationOptions<TCommand, TData>) => {
    const queryClient = useQueryClient();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        formData,
        setFormData,
        fieldErrors,
        setFieldErrors,
        handleChange,
        handleSelectChange,
    } = useFormBase<TCommand>({
        initialState: initialData,
        numericFields,
    });

    useEffect(() => {
        setFormData(initialData);
        setFieldErrors({});
    }, [initialData, setFormData, setFieldErrors]);

    const mutation = useMutation({ mutationFn });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitError(null);
        setFieldErrors({});

        const result = schema.safeParse(formData);

        if (!result.success) {
            setFieldErrors(getZodFieldErrors(result.error));
            return;
        }

        try {
            const data = await mutation.mutateAsync(result.data);

            await Promise.all(
                queryKeysToInvalidate.map((key) =>
                    queryClient.invalidateQueries({ queryKey: key })
                )
            );

            await onSuccess?.(data);
        } catch (error) {
            if (error instanceof ValidationError) {
                setFieldErrors(getApiFieldErrors(error));
            }

            setSubmitError(
                getErrorMessage(error, "Error en la operación")
            );
        }
    };

    const resetForm = () => {
        setFormData(initialData);
        setFieldErrors({});
        setSubmitError(null);
    };

    return {
        formData,
        fieldErrors,
        submitError,
        handleChange,
        handleSelectChange,
        handleSubmit,
        resetForm,
        isSubmitting: mutation.isPending,
        setFormData,
        setFieldErrors,
    };
};