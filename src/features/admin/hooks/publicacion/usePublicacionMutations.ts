// src/features/admin/hooks/usePublicacionMutations.ts

// Librerías externas.
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Hooks.
import { useFormMutation } from "@/features/admin/hooks/useFormMutation";

// Schemas.
import { addPublicacionSchema } from "@/features/admin/schemas/publicationSchemas";

// Servicios.
import {
  addPublicacionAsync,
  updateEstadoPublicacionAync
} from "@/features/admin/services/apiPublicacion";

// Types.
import type { AddPublicacionCommand } from "@/types/commands/PublicacionCommands";
import type { ProductosResponse } from "@/types/responses/ProductoResponses";

// campos númericos especifícos para evaluación.
const numericFields = new Set(["productoId"]);

// estado inicial vacío de publicación.
export const getInitialPublicacion = (
  productoId: number
): AddPublicacionCommand => ({
  productoId,
  tituloPublicacion: "",
  descripcionPublicacion: "",
  estadoPublicacionCodigo: "",
  destacado: false
});

export const useAddPublicacionMutation = (
  initialData: AddPublicacionCommand,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();

  return useFormMutation({
    schema: addPublicacionSchema,
    mutationFn: addPublicacionAsync,
    initialData,
    numericFields,
    queryKeysToInvalidate: [["productos"]],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["producto", initialData.productoId],
      });
      onSuccess?.()
    },
  });
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