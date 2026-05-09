// src: src/features/admin/schemas/product.schema.ts

import { z } from "zod";

export const addProductoSchema = z.object({
  nombreProducto: z
    .string()
    .min(1, "El nombre del producto es obligatorio.")
    .max(100, "El nombre del producto no puede exceder los 100 caracteres."),

  descripcionProducto: z
    .string()
    .min(1, "La descripción del producto es obligatoria.")
    .max(500, "La descripción del producto no puede exceder los 500 caracteres."),

  escalaBase: z
    .string()
    .min(1, "La escala base es obligatoria.")
    .max(50, "La escala base no puede exceder los 50 caracteres."),

  // Coerce para transformar el string del input a número antes de validar
  costoProduccionBase: z.coerce
    .number()
    .gt(0, "El costo de producción base debe ser mayor que cero."),

  filamentoUsoBase: z.coerce
    .number()
    .gt(0, "El filamento de uso base debe ser mayor que cero."),

  // .nullable() o .optional() si puede ser null
  autorNombre: z
    .string()
    .max(100, "El nombre del autor no puede exceder los 100 caracteres.")
    .optional()
    .or(z.literal("")), 

  fechaLanzamiento: z.coerce
    .date()
    .refine((date) => date <= new Date(), {
      message: "La fecha de lanzamiento no puede ser futura.",
    }),
    
  coleccionId: z.coerce.number().optional(),
});

export const updateProductoSchema = addProductoSchema.extend({
  productoId: z.number().gt(0, "El producto no es valido."),
});

export type AddProductSchema = z.infer<typeof addProductoSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductoSchema>;