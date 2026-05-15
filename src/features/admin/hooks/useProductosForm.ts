// src/features/admin/hooks/useProductosForm.ts

import { useEffect, useState } from "react";

import { getErrorMessage } from "@/errors/ApiError";
import { ValidationError } from "@/errors/ValidationError";

import { useFormBase } from "@/features/admin/hooks/useFormBase";

import {
  addProductoSchema,
  updateProductoSchema
} from "@/features/admin/schemas/productSchemas";

import {
  addProductoAsync,
  updateProductoAsync,
} from "@/features/admin/services/ApiProducto";

import {
  getApiFieldErrors,
  getZodFieldErrors
} from "@/features/admin/utils/formErrorsUtils";

import type {
  AddProductoCommand,
  UpdateProductoCommand,
} from "@/types/ProductoCommand";

// creación de estado inicial vacío de Producto.
export const getInitialProducto = (): AddProductoCommand => ({
  nombreProducto: "",
  descripcionProducto: "",
  autorNombre: undefined,
  fechaLanzamiento: "",
  coleccionId: undefined
});

// prop para definición de operación post éxito.
type SubmitProps = {
  onSuccess?: () => void | Promise<void>;
};

// hook para manejo completo del formulario de creación de productos:
// estado, validación, envío y manejo de errores.
export const useAddProductoForm = ({ onSuccess }: SubmitProps) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    formData,
    setFormData,
    fieldErrors,
    setFieldErrors,
    handleChange,
    handleSelectChange
  } = useFormBase<AddProductoCommand>({
    initialState: getInitialProducto()
    // no hay numericFields.
  });

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
      setFormData(getInitialProducto());
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
    handleSelectChange,
    handleSubmit,
    isSubmitting
  };
};

type UpdateProductoProps = SubmitProps & {
  initialData: UpdateProductoCommand;
};

export const useUpdateProductoForm = ({
  initialData,
  onSuccess
}: UpdateProductoProps) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    formData,
    setFormData,
    fieldErrors,
    setFieldErrors,
    handleChange,
    handleSelectChange
  } = useFormBase<UpdateProductoCommand>({
    initialState: initialData,
    // no hay numericFields
  });

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
    handleSelectChange,
    handleSubmit,
    isSubmitting
  };
};