// src/features/admin/utils/formErrorUtils.ts

import type { FieldErrors } from "@/errors/ApiError";
import type { ValidationError } from "@/errors/ValidationError";
import type { z } from "zod";

const normalizeFieldName = (field: string) =>
    field.charAt(0).toLowerCase() + field.slice(1);

export const getZodFieldErrors = <T extends object>(
    error: z.ZodError<T>
): FieldErrors => {
    return error.issues.reduce<FieldErrors>((acc, issue) => {
        const field = issue.path[0];

        if (typeof field === "string" && !acc[field]) {
            acc[field] = issue.message;
        }

        return acc;
    }, {});
};

export const getApiFieldErrors = (
    error: ValidationError
): FieldErrors =>
    Object.entries(error.fieldErrors).reduce<FieldErrors>(
        (acc, [field, message]) => {
            acc[normalizeFieldName(field)] = message;
            return acc;
        },
        {}
    );