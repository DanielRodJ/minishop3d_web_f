import React from "react";

export type InputVariant = "default" | "error" | "filter";
export type InputSize = "sm" | "md" | "lg";

const variantStyles: Record<InputVariant, string> = {
    default: "border-gray-300 focus:ring-black",
    error: "border-red-500 focus:ring-red-500",
    filter: "border-transparent bg-gray-100 focus:ring-black",
};

const sizeStyles: Record<InputSize, string> = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
};

type InputBaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    variant?: InputVariant;
    size?: InputSize;
};

export const InputBase = ({
    variant = "default",
    size = "md",
    className = "",
    ...props
}: InputBaseProps) => {
    return (
        <input
            {...props}
            className={`
        w-full rounded-md border text-gray-500
        focus:outline-none focus:ring-1 focus:border-transparent
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
        />
    );
};