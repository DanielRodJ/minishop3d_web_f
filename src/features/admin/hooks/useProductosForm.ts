// src/features/admin/hooks/useProductosForm.ts

import { useEffect, useState, type ChangeEvent } from "react";

import type { z } from "zod";

import { getErrorMessage, type FieldErrors } from "@/errors/ApiError";
import { ValidationError } from "@/errors/ValidationError";

import type {
  AddProductoCommand,
  UpdateProductoCommand
} from "@/types/ProductCommand";

import {
  addProductoSchema,
  updateProductoSchema
} from "@/features/admin/schemas/productSchemas";

import {
  addProductoAsync,
  updateProductoAsync
} from "@/features/admin/services/ProductoApi";

const normalizeFieldName = (field: string) =>
  field.charAt(0).toLowerCase() + field.slice(1);

const getZodFieldErrors = <T extends object>(
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

const getApiFieldErrors = (error: ValidationError): FieldErrors =>
  Object.entries(error.fieldErrors).reduce<FieldErrors>((acc, [field, message]) => {
    acc[normalizeFieldName(field)] = message;
    return acc;
  }, {});

const useProductoFormBase = <T extends object>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: ["costoProduccionBase", "filamentoUsoBase"].includes(name)
        ? Number(value)
        : value
    } as T));

    setFieldErrors(prev => {
      if (!prev[name]) return prev;

      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  return {
    formData,
    setFormData,
    fieldErrors,
    setFieldErrors,
    handleChange
  };
};

const getInitial = (): AddProductoCommand => ({
  nombreProducto: "",
  descripcionProducto: "",
  escalaBase: "",
  costoProduccionBase: 0,
  filamentoUsoBase: 0,
  autorNombre: undefined,
  fechaLanzamiento: "",
  coleccionId: undefined
});

type AddProps = {
  onSuccess?: () => void | Promise<void>;
};

export const useAddProductoForm = ({ onSuccess }: AddProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    formData,
    setFormData,
    fieldErrors,
    setFieldErrors,
    handleChange
  } = useProductoFormBase<AddProductoCommand>(getInitial());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors({});

    const result = addProductoSchema.safeParse(formData);

    if (!result.success) {
      setFieldErrors(getZodFieldErrors(result.error));
      return;
    }

    setIsSubmitting(true);

    try {
      await addProductoAsync(formData);
      await onSuccess?.();
      setFormData(getInitial());
    } catch (error) {
      if (error instanceof ValidationError) {
        setFieldErrors(getApiFieldErrors(error));
      }

      setSubmitError(getErrorMessage(error, "Error al crear producto"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    fieldErrors,
    submitError,
    handleChange,
    handleSubmit,
    isSubmitting
  };
};

type UpdateProps = {
  initialData: UpdateProductoCommand;
  onSuccess?: () => void | Promise<void>;
};

export const useUpdateProductoForm = ({
  initialData,
  onSuccess
}: UpdateProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    formData,
    setFormData,
    fieldErrors,
    setFieldErrors,
    handleChange
  } = useProductoFormBase<UpdateProductoCommand>(initialData);

  useEffect(() => {
    setFormData(initialData);
    setFieldErrors({});
    setSubmitError(null);
  }, [initialData, setFormData, setFieldErrors]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors({});

    const result = updateProductoSchema.safeParse(formData);

    if (!result.success) {
      setFieldErrors(getZodFieldErrors(result.error));
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProductoAsync(formData);
      await onSuccess?.();
    } catch (error) {
      if (error instanceof ValidationError) {
        setFieldErrors(getApiFieldErrors(error));
      }

      setSubmitError(getErrorMessage(error, "Error al actualizar producto"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    fieldErrors,
    submitError,
    handleChange,
    handleSubmit,
    isSubmitting
  };
};