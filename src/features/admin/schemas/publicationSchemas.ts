// src/features/admin/schemas/publicationSchemas.ts

import { z } from "zod";

export const addPublicacionSchema = z.object({
  tituloPublicacion: z
    .string()
    .min(1, "El titulo de la publicacion es obligatorio.")
    .max(150, "El titulo no puede exceder los 150 caracteres."),

  descripcionPublicacion: z
    .string()
    .min(1, "La descripcion de la publicacion es obligatoria.")
    .max(1000, "La descripcion no puede exceder los 1000 caracteres."),

  productoId: z.coerce
    .number()
    .gt(0, "Selecciona una presentacion valida."),

  estadoPublicacionCodigo: z
    .string()
    .min(1, "Selecciona un estado para la publicacion."),

  destacado: z.boolean(),
});

export const updatePublicacionSchema = addPublicacionSchema.extend({
  publicacionId: z.number().gt(0, "La publicacion no es valida."),
});

export type AddPublicacionSchema = z.infer<typeof addPublicacionSchema>;
export type UpdatePublicacionSchema = z.infer<typeof updatePublicacionSchema>;
