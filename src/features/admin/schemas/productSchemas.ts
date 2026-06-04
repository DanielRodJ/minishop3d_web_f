import { z } from "zod";

export const addProductoSchema = z.object({
  nombreProducto: z
    .string()
    .min(1, "El nombre del producto es obligatorio.")
    .max(100, "El nombre del producto no puede exceder los 100 caracteres."),

  descripcionProducto: z
    .string()
    .min(1, "La descripcion del producto es obligatoria.")
    .max(500, "La descripcion del producto no puede exceder los 500 caracteres."),

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

const emptyToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

export const addProductoPresentacionSchema = z.object({
  productoId: z.number().gt(0, "El producto no es valido."),

  filamentoId: z.preprocess(
    emptyToUndefined,
    z.coerce.number({
      error: "Selecciona un filamento.",
    }).gt(0, "Selecciona un filamento.")
  ),

  escalaCodigo: z.string().min(1, "Selecciona una escala."),

  dimensionX: z.preprocess(
    emptyToUndefined,
    z.coerce.number({
      error: "La dimension X debe ser un numero.",
    }).gt(0, "La dimension X debe ser mayor que cero.")
  ),

  dimensionY: z.preprocess(
    emptyToUndefined,
    z.coerce.number({
      error: "La dimension Y debe ser un numero.",
    }).gt(0, "La dimension Y debe ser mayor que cero.")
  ),

  dimensionZ: z.preprocess(
    emptyToUndefined,
    z.coerce.number({
      error: "La dimension Z debe ser un numero.",
    }).gt(0, "La dimension Z debe ser mayor que cero.")
  ),

  tiempoImpresionMinutos: z.preprocess(
    emptyToUndefined,
    z.coerce.number({
      error: "El tiempo de impresion debe ser un numero.",
    })
      .int("El tiempo de impresion debe ser un numero entero.")
      .gt(0, "El tiempo de impresion debe ser mayor que cero.")
  ),

  cantidadGramosFilamentoUso: z.preprocess(
    emptyToUndefined,
    z.coerce.number({
      error: "Los gramos de filamento deben ser un numero.",
    }).gt(0, "Los gramos de filamento deben ser mayores que cero.")
  ),

  estadoProductoPresentacionCodigo: z
    .string()
    .min(1, "Selecciona un estado."),

  stock: z.preprocess(
    emptyToUndefined,
    z.coerce.number({
      error: "El stock debe ser un numero.",
    })
      .int("El stock debe ser un numero entero.")
      .min(0, "El stock no puede ser negativo.")
  ),

  costoProduccionAdicional: z.preprocess(
    emptyToUndefined,
    z.coerce.number({
      error: "El costo adicional debe ser un numero.",
    }).min(0, "El costo adicional no puede ser negativo.")
  ),

  precioVenta: z.preprocess(
    emptyToUndefined,
    z.coerce.number({
      error: "El precio de venta debe ser un numero.",
    })
      .gt(0, "El precio de venta debe ser mayor que cero.")
      .optional()
  ),
});

export const updateProductoPresentacionSchema =
  addProductoPresentacionSchema.extend({
    productoPresentacionId: z
      .number()
      .gt(0, "La presentacion no es valida."),
  });

export type AddProductSchema = z.infer<typeof addProductoSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductoSchema>;
export type AddProductPresentationSchema = z.infer<
  typeof addProductoPresentacionSchema
>;
export type UpdateProductPresentationSchema = z.infer<
  typeof updateProductoPresentacionSchema
>;
