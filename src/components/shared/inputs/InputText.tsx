import React from "react";
import { InputBase } from "./InputBase";
import type { InputVariant, InputSize } from "./InputBase";

type InputTextProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type"
> & {
    variant?: InputVariant;
    size?: InputSize;
};

export const InputText = ({
    id = "inputText",
    name = "inputText",
    placeholder = "Campo de texto",
    "aria-label": ariaLabel = "Campo de texto",
    ...props
}: InputTextProps) => {
    return (
        <InputBase
            {...props}
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            aria-label={ariaLabel}
        />
    );
};