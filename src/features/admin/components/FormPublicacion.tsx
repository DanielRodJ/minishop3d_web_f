// src/features/admin/components/FormPublicacion.tsx

import type { ChangeEvent } from "react";

import type { FieldErrors } from "@/errors/ApiError";
import { ErrorMessage } from "@/components/shared/feedback/ErrorMessage";
import { Dropdown, type SelectOption } from "@/components/shared/inputs/Dropdown";
import { InputText } from "@/components/shared/inputs/InputText";
import { InputTextArea } from "@/components/shared/inputs/InputTextArea";
import type { AddPublicacionCommand } from "@/types/commands/PublicacionCommand";

type Props = {
  formData: AddPublicacionCommand;
  estadoOptions: SelectOption[];
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string | number) => void;
  handleBooleanChange: (name: keyof AddPublicacionCommand, value: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fieldErrors?: FieldErrors;
  submitError?: string | null;
  disabled: boolean;
};

export const FormPublicacion = ({
  formData,
  estadoOptions,
  handleChange,
  handleSelectChange,
  handleBooleanChange,
  handleSubmit,
  fieldErrors = {},
  submitError,
  disabled
}: Props) => {
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
      {submitError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3">
          <ErrorMessage message={submitError} />
        </div>
      )}

      <div>
        <InputText
          id="tituloPublicacion"
          name="tituloPublicacion"
          placeholder="Titulo de la publicacion"
          value={formData.tituloPublicacion}
          onChange={handleChange}
          variant={fieldErrors.tituloPublicacion ? "error" : "default"}
          disabled={disabled}
        />
        {fieldErrors.tituloPublicacion && (
          <ErrorMessage message={fieldErrors.tituloPublicacion} />
        )}
      </div>

      <div>
        <InputTextArea
          id="descripcionPublicacion"
          name="descripcionPublicacion"
          placeholder="Descripcion para la tienda"
          value={formData.descripcionPublicacion}
          onChange={handleChange}
          className={fieldErrors.descripcionPublicacion ? "border-red-500 focus:ring-red-500" : ""}
          disabled={disabled}
        />
        {fieldErrors.descripcionPublicacion && (
          <ErrorMessage message={fieldErrors.descripcionPublicacion} />
        )}
      </div>

      <Dropdown
        name="estadoPublicacionCodigo"
        value={formData.estadoPublicacionCodigo}
        options={estadoOptions}
        placeholder="Estado de publicacion"
        error={fieldErrors.estadoPublicacionCodigo}
        disabled={disabled}
        onChange={handleSelectChange}
      />

      {fieldErrors.productoId && (
        <ErrorMessage message={fieldErrors.productoId} />
      )}

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={formData.destacado}
          disabled={disabled}
          onChange={(e) => handleBooleanChange("destacado", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        Marcar como destacada
      </label>

      <div className="flex justify-end border-t border-slate-200 pt-4">
        <button
          type="submit"
          disabled={disabled}
          className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {disabled ? "Guardando..." : "Crear publicacion"}
        </button>
      </div>
    </form>
  );
};
