// src/features/admin/components/FormsProduct.tsx

import type { ChangeEvent } from "react";

import { ErrorMessage } from "@/components/shared/feedback/ErrorMessage";
import { DatePicker } from "@/components/shared/inputs/DatePicker";
import { InputText } from "@/components/shared/inputs/InputText";
import { InputTextArea } from "@/components/shared/inputs/InputTextArea";

import type { FieldErrors } from "@/errors/ApiError";

import type { AddProductoCommand } from "@/types/ProductoCommand";

type ProductoFormData = AddProductoCommand & { productoId?: number };

type Props = {
  mod: "add" | "update";
  formData: ProductoFormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fieldErrors?: FieldErrors;
  submitError?: string | null;
  disabled: boolean;
  onClose: () => void;
};

export const FormProducto = ({
  formData,
  handleChange,
  handleSubmit,
  fieldErrors = {},
  submitError,
  onClose,
  disabled
}: Props) => {
  const title = formData.productoId ? "Modificar producto" : "Añadir producto";
  const submitText = formData.productoId ? "Guardar cambios" : "Crear producto";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white w-full max-w-3xl rounded-lg p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black disabled:opacity-50"
          disabled={disabled}
          aria-label="Cerrar formulario"
        >
          x
        </button>

        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>

        <hr className="border-t border-gray-200 my-4" />

        <form onSubmit={handleSubmit} autoComplete="off" noValidate className="space-y-5">
          {submitError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <ErrorMessage message={submitError} />
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Información general</h3>

            <div>
              <InputText
                id="nombreProducto"
                name="nombreProducto"
                placeholder="Nombre del producto"
                value={formData.nombreProducto}
                onChange={handleChange}
                variant={fieldErrors.nombreProducto ? "error" : "default"}
                disabled={disabled}
              />
              {fieldErrors.nombreProducto && (
                <ErrorMessage message={fieldErrors.nombreProducto} />
              )}
            </div>

            <div>
              <InputTextArea
                id="descripcionProducto"
                name="descripcionProducto"
                placeholder="Descripción del producto"
                value={formData.descripcionProducto}
                onChange={handleChange}
                className={fieldErrors.descripcionProducto ? "border-red-500 focus:ring-red-500" : ""}
                disabled={disabled}
              />
              {fieldErrors.descripcionProducto && (
                <ErrorMessage message={fieldErrors.descripcionProducto} />
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <InputText
                  id="autorNombre"
                  name="autorNombre"
                  placeholder="Autor"
                  value={formData.autorNombre}
                  onChange={handleChange}
                  variant={fieldErrors.autorNombre ? "error" : "default"}
                  disabled={disabled}
                />
                {fieldErrors.autorNombre && (
                  <ErrorMessage message={fieldErrors.autorNombre} />
                )}
              </div>

              <div>
                <DatePicker
                  id="fechaLanzamiento"
                  name="fechaLanzamiento"
                  value={formData.fechaLanzamiento}
                  onChange={handleChange}
                  variant={fieldErrors.fechaLanzamiento ? "error" : "default"}
                  disabled={disabled}
                />
                {fieldErrors.fechaLanzamiento && (
                  <ErrorMessage message={fieldErrors.fechaLanzamiento} />
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-black disabled:opacity-50"
              disabled={disabled}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
              disabled={disabled}
            >
              {disabled ? "Guardando..." : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};