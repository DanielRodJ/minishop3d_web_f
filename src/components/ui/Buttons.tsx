// Archivo: src/components/ui/Buttons.tsx

import React from "react";
import {
    PencilIcon,
    ShoppingCartIcon,
    TrashIcon,
    FolderPlusIcon,
    DocumentArrowDownIcon
} from "@heroicons/react/24/solid";

/* =========================================================
    Variants
   ========================================================= */

type ButtonVariant =
    | "default"
    | "adminButton"
    | "shopping"
    | "menu"
    | "ghost"
    | "tableButton";

const variantStyles: Record<ButtonVariant, string> = {
    default: "bg-orange-400 hover:bg-orange-600 text-white",
    adminButton: "px-10 bg-[#612D53] hover:bg-[#F3F4F4] text-white hover:text-black",
    shopping: "bg-orange-400 hover:bg-orange-600 text-white",
    menu: "bg-red-400 hover:bg-red-600 text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
    tableButton: "px-1.5 hover:underline"
};

/* =========================================================
    Presets
   ========================================================= */

type ButtonPresetConfig = {
    text: string;
    variant: ButtonVariant;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    className?: string;
};

const buttonPresets: Record<string, ButtonPresetConfig> = {
    addRecord: {
        text: "Añadir",
        variant: "adminButton",
        Icon: FolderPlusIcon
    },
    generateDocument: {
        text: "Descargar",
        variant: "adminButton",
        Icon: DocumentArrowDownIcon
    },
    filters: {
        text: "Filtrar",
        variant: "adminButton",
        Icon: FolderPlusIcon
    },
    shoppingCart: {
        text: "Agregar",
        variant: "shopping",
        Icon: ShoppingCartIcon
    },
    delete: {
        text: "Eliminar",
        variant: "ghost",
        Icon: TrashIcon
    },
    tableModify: {
        text: "Modificar",
        variant: "tableButton",
        Icon: PencilIcon,
        className: "text-blue-500"
    },
    tableDelete: {
        text: "Eliminar",
        variant: "tableButton",
        Icon: TrashIcon,
        className: "text-red-500"
    }
};

type ButtonPreset = keyof typeof buttonPresets;

/* =========================================================
    Props
   ========================================================= */

interface ButtonCustomProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    variant?: ButtonVariant;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    preset?: ButtonPreset;
}

/* =========================================================
    Componente base
   ========================================================= */

export const ButtonCustom = ({
    preset,
    text,
    variant = "default",
    Icon,
    className,
    ...props
}: ButtonCustomProps) => {
    const presetConfig = preset ? buttonPresets[preset] : undefined;

    const finalText = presetConfig?.text ?? text;
    const finalVariant = presetConfig?.variant ?? variant;
    const FinalIcon = presetConfig?.Icon ?? Icon;

    return (
        <button
            {...props}
            className={`flex items-center justify-center gap-2 py-1.5 rounded-md
        transition-colors duration-300 cursor-pointer shadow-sm 
        active:scale-95 ${variantStyles[finalVariant]}
        ${presetConfig?.className ?? ""} ${className ?? ""}`}
        >
            {FinalIcon && <FinalIcon className="h-5 w-5" />}
            {finalText && (
                <span className="font-semibold text-sm">{finalText}</span>
            )}
        </button>
    );
};