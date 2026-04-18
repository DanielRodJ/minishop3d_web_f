import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid'
import { FolderPlusIcon } from '@heroicons/react/24/solid';
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid';

type ButtonVariant = "default" | "adminButton" | "shopping" | "menu" | "ghost";

const variantStyles: Record<ButtonVariant, string> = {
    default: "bg-orange-400 hover:bg-orange-600 text-white",
    adminButton: "bg-[#612D53] hover:bg-[#F3F4F4] text-white hover:text-black",
    shopping: "bg-orange-400 hover:bg-orange-600 text-white",
    menu: "bg-red-400 hover:bg-red-600 text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
};

interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant?: ButtonVariant;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonCustom = ({ text, Icon, variant = "default", ...props }: ButtonCustomProps) => {
    return (
        <button
            {...props}
            className={`flex items-center justify-center gap-2 py-1.5 px-10 rounded-md
                       transition-colors duration-400 cursor-pointer shadow-sm 
                       active:scale-95 ${variantStyles[variant]} ${props.className ?? ""}`}
        >
            {Icon && <Icon className="h-5 w-5" />}
            <span className="font-semibold text-sm">
                {text}
            </span>
        </button>
    );
};

export const ButtonShoppingCart = (props: Omit<ButtonCustomProps, "text" | "variant" | "Icon">) => (
    <ButtonCustom text="Agregar" Icon={ShoppingCartIcon} variant="shopping" {...props} />
);

export const ButtonDelete = (props: Omit<ButtonCustomProps, "text" | "variant" | "Icon">) => (
    <ButtonCustom text="Eliminar" Icon={TrashIcon} variant="ghost" {...props} />
);

export const ButtonMenu = (props: Omit<ButtonCustomProps, "variant" | "Icon">) => (
    <ButtonCustom Icon={TrashIcon} variant="menu" {...props} />
);

export const ButtonAddRecord = (props: Omit<ButtonCustomProps, "text" | "variant" | "Icon">) => (
    <ButtonCustom text="Añadir" Icon={FolderPlusIcon} variant="adminButton" {...props} />
)

export const ButtonGenerateDocument = (props: Omit<ButtonCustomProps, "text" | "variant" | "Icon">) => (
    <ButtonCustom text="Descargar" Icon={DocumentArrowDownIcon} variant="adminButton" {...props} />
)

export const ButtonFilters = (props: Omit<ButtonCustomProps, "text" | "variant" | "Icon">) => (
    <ButtonCustom text="Filtrar" Icon={FolderPlusIcon} variant="adminButton" {...props} />
)