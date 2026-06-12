// src/features/admin/hooks/useFormBase.ts

// Librerías externas.
import { useState, type ChangeEvent } from "react";

// Errores.
import type { FieldErrors } from "@/errors/ApiError";

type UseFormBaseProps<T> = {
    initialState: T;
    numericFields?: Set<string>;
};

export const useFormBase = <T extends object>({
    initialState,
    numericFields = new Set()
}: UseFormBaseProps<T>) => {

    const [formData, setFormData] = useState<T>(initialState);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const clearFieldError = (name: string) => {
        setFieldErrors(prev => {
            if (!prev[name]) return prev;

            const next = { ...prev };
            delete next[name];
            return next;
        });
    };

    const parseFieldValue = (name: string, value: string) => {
        if (!numericFields.has(name)) return value;
        if (value === "") return undefined;

        return Number(value);
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, type } = e.target;

        const value = type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : parseFieldValue(name, e.target.value);

        setFormData(prev => ({
            ...prev,
            [name]: value
        } as T));

        clearFieldError(name);
    };

    const handleSelectChange = (
        name: string,
        value: string | number
    ) => {

        setFormData(prev => ({
            ...prev,
            [name]: value
        } as T));

        clearFieldError(name);
    };

    return {
        formData,
        setFormData,
        fieldErrors,
        setFieldErrors,
        handleChange,
        handleSelectChange
    };
};