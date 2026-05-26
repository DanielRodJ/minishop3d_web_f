// src/features/admin/components/FormsProductPresentation.tsx

import type { ChangeEvent } from "react";

import type { FieldErrors } from "@/errors/ApiError";

import { ErrorMessage } from "@/components/shared/feedback/ErrorMessage";
import { Dropdown, type SelectOption } from "@/components/shared/inputs/Dropdown";
import { InputNumber } from "@/components/shared/inputs/InputNumber";
import type { AddProductoPresentacionCommand } from "@/types/ProductoPresentacionCommands";

type PresentacionFormData = AddProductoPresentacionCommand & {
  productoPresentacionId?: number;
};

type Props = {
  formData: PresentacionFormData;
  escalaOptions: SelectOption[];
  estadoOptions: SelectOption[];
  filamentoOptions: SelectOption[];
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string | number) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCalculatePrice: () => void;
  fieldErrors?: FieldErrors;
  submitError?: string | null;
  disabled: boolean;
  isCalculating: boolean;
  onClose: () => void;
};

export const FormProductPresentation = ({
  formData,
  escalaOptions,
  estadoOptions,
  filamentoOptions,
  handleChange,
  handleSelectChange,
  handleSubmit,
  handleCalculatePrice,
  fieldErrors = {},
  submitError,
  disabled,
  isCalculating,
  onClose
}: Props) => {
  const isUpdate = !!formData.productoPresentacionId;

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white w-full max-w-5xl rounded-lg p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black disabled:opacity-50 cursor-pointer"
          disabled={disabled}
          aria-label="Cerrar formulario"
        >
          x
        </button>

        <h2 className="text-xl font-semibold text-gray-800">
          {isUpdate ? "Editar presentación" : "Añadir presentación"}
        </h2>

        <hr className="border-t border-gray-200 my-4" />

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
          {submitError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <ErrorMessage message={submitError} />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Dropdown
              name="filamentoId"
              value={formData.filamentoId || undefined}
              options={filamentoOptions}
              placeholder="Filamento"
              error={fieldErrors.filamentoId}
              disabled={disabled}
              onChange={handleSelectChange}
            />

            <Dropdown
              name="escalaCodigo"
              value={formData.escalaCodigo}
              options={escalaOptions}
              placeholder="Escala"
              error={fieldErrors.escalaCodigo}
              disabled={disabled}
              onChange={handleSelectChange}
            />

            <Dropdown
              name="estadoProductoPresentacionCodigo"
              value={formData.estadoProductoPresentacionCodigo}
              options={estadoOptions}
              placeholder="Estado"
              error={fieldErrors.estadoProductoPresentacionCodigo}
              disabled={disabled}
              onChange={handleSelectChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InputNumber
              id="dimensionX"
              name="dimensionX"
              label="Dimensión X"
              placeholder="Dimensión X"
              value={formData.dimensionX}
              error={fieldErrors.dimensionX}
              disabled={disabled}
              onChange={handleChange}
              step={0.01}
            />

            <InputNumber
              id="dimensionY"
              name="dimensionY"
              label="Dimensión Y"
              placeholder="Dimensión Y"
              value={formData.dimensionY}
              error={fieldErrors.dimensionY}
              disabled={disabled}
              onChange={handleChange}
              step={0.01}
            />

            <InputNumber
              id="dimensionZ"
              name="dimensionZ"
              label="Dimensión Z"
              placeholder="Dimensión Z"
              value={formData.dimensionZ}
              error={fieldErrors.dimensionZ}
              disabled={disabled}
              onChange={handleChange}
              step={0.01}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InputNumber
              id="tiempoImpresionMinutos"
              name="tiempoImpresionMinutos"
              label="Tiempo impresión (min)"
              placeholder="Tiempo impresión (min)"
              value={formData.tiempoImpresionMinutos}
              error={fieldErrors.tiempoImpresionMinutos}
              disabled={disabled}
              onChange={handleChange}
            />

            <InputNumber
              id="cantidadGramosFilamentoUso"
              name="cantidadGramosFilamentoUso"
              label="Filamento usado (g)"
              placeholder="Filamento usado (g)"
              value={formData.cantidadGramosFilamentoUso}
              error={fieldErrors.cantidadGramosFilamentoUso}
              disabled={disabled}
              onChange={handleChange}
              step={0.01}
            />

            <InputNumber
              id="stock"
              name="stock"
              label="Stock"
              placeholder="Stock"
              value={formData.stock}
              error={fieldErrors.stock}
              disabled={disabled}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputNumber
              id="costoProduccionAdicional"
              name="costoProduccionAdicional"
              label="Costo adicional"
              placeholder="Costo adicional"
              value={formData.costoProduccionAdicional}
              error={fieldErrors.costoProduccionAdicional}
              disabled={disabled}
              onChange={handleChange}
              step={0.01}
            />

            <div className="flex items-start gap-2">
              <InputNumber
                id="precioVenta"
                name="precioVenta"
                label="Precio venta"
                placeholder="Precio venta"
                value={formData.precioVenta ?? ""}
                error={fieldErrors.precioVenta}
                disabled={disabled}
                onChange={handleChange}
                step={0.01}
              />

              <button
                type="button"
                className="mt-6 h-fit rounded-md bg-purple-50 px-3 py-2 cursor-pointer"
                disabled={disabled || isCalculating}
                onClick={handleCalculatePrice}
              >
                Calcular precio de venta
              </button>
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
              {disabled ? "Guardando..." : "Guardar presentación"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
