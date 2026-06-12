import type { ChangeEvent } from "react";

import type { FieldErrors } from "@/errors/ApiError";
import { ErrorMessage } from "@/components/shared/feedback/ErrorMessage";
import { Dropdown, type SelectOption } from "@/components/shared/inputs/Dropdown";
import { InputText } from "@/components/shared/inputs/InputText";
import { InputTextArea } from "@/components/shared/inputs/InputTextArea";
import type { AddPublicacionCommand } from "@/types/commands/PublicacionCommands";

type PublicacionFormData = AddPublicacionCommand & {
    publicacionId?: number;
};

type FormPublicacionFieldsProps = {
    formData: PublicacionFormData;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (name: string, value: string | number) => void;
    fieldErrors?: FieldErrors;
    disabled?: boolean;
    estadoOptions: SelectOption[];
};

export const FormPublicacionFields = ({
    formData,
    handleChange,
    handleSelectChange,
    fieldErrors = {},
    disabled,
    estadoOptions,
}: FormPublicacionFieldsProps) => {
    return (
        <>
            <div>
                <InputText
                    id="tituloPublicacion"
                    name="tituloPublicacion"
                    placeholder="Título de la publicación"
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
                    placeholder="Descripción para la tienda"
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
                placeholder="Estado de publicación"
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
                    name="destacado"
                    checked={formData.destacado}
                    disabled={disabled}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300"
                />
                Marcar como destacada
            </label>
        </>
    );
};
