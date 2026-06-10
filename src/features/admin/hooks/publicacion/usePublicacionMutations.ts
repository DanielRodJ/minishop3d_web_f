// src/features/admin/hooks/usePublicacionMutations.ts

// Librerías externas.
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Hooks.
import { useFormBase } from "@/features/admin/hooks/useFormBase";

// Schemas.
import { addPublicacionSchema } from "@/features/admin/schemas/publicationSchemas";

// Servicios.
import { 
  addPublicacionAsync, 
  updateEstadoPublicacionAync 
} from "@/features/admin/services/apiPublicacion";

// Utils.
import { getErrorMessage } from "@/errors/ApiError";
import { ValidationError } from "@/errors/ValidationError";

import {
  getApiFieldErrors,
  getZodFieldErrors
} from "@/features/admin/utils/formErrorsUtils";

// Types.
import type { AddPublicacionCommand } from "@/types/commands/PublicacionCommands";
import type { ProductosResponse } from "@/types/responses/ProductoResponses";

// campos númericos
const numericFields = new Set(["productoId"]);

// creación de estado inicial vacío de Publicacion.
export const getInitialPublicacion = (
  productoId: number
): AddPublicacionCommand => ({
  productoId,
  tituloPublicacion: "",
  descripcionPublicacion: "",
  estadoPublicacionCodigo: "",
  destacado: false
});

type SubmitProps = {
  onSuccess?: () => void | Promise<void>;
};

type AddPublicacionProps = SubmitProps & {
  productoId: number
};

// hook para manejo completo del formulario de creación de publicaciones:
// estado, validación, envío y manejo de errores.
export const useAddPublicacionMutation = ({
  productoId,
  onSuccess
}: AddPublicacionProps) => {

  const queryClient = useQueryClient();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    formData,
    setFormData,
    fieldErrors,
    setFieldErrors,
    handleChange,
    handleSelectChange
  } = useFormBase<AddPublicacionCommand>({
    initialState: getInitialPublicacion(productoId),
    numericFields
  });

  const addPublicacionMutation = useMutation({
    mutationFn: addPublicacionAsync,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["producto", productoId] })
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors({});

    const result = addPublicacionSchema.safeParse(formData);

    if (!result.success) {
      setFieldErrors(getZodFieldErrors(result.error));
      return;
    }

    try {
      await addPublicacionMutation.mutateAsync(formData);
      await onSuccess?.();
      setFormData(getInitialPublicacion(productoId));
    } catch (error) {
      if (error instanceof ValidationError) {
        setFieldErrors(getApiFieldErrors(error));
      }

      setSubmitError(getErrorMessage(error, "Error al crear publicacion"));
    }
  };

  return {
    formData,
    fieldErrors,
    submitError,
    handleChange,
    handleSelectChange,
    handleSubmit,
    isSubmitting: addPublicacionMutation.isPending
  };
};

export const useUpdateEstadoPublicacionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEstadoPublicacionAync,

    onSuccess: (productoActualizado) => {
      queryClient.setQueriesData<ProductosResponse>(
        {
          queryKey: ["productos", "lista"],
        },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            items: oldData.items.map((item) =>
              item.productoId === productoActualizado.productoId
                ? productoActualizado
                : item
            ),
          };
        }
      );
    },
  });
}