import React from "react";

type InputTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

export const InputTextArea = ({
    id = "inputTextArea",
    name = "inputTextArea",
    placeholder = "Campo de texto",
    "aria-label": ariaLabel = "Campo de texto",
    className = "",
    ...props
}: InputTextAreaProps) => {
    return (
        <textarea
            {...props}
            maxLength={500}
            className={`
                w-full rounded-md border border-gray-300 text-gray-500
                p-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent
                resize-none
                ${className}
            `}
            id={id}
            name={name}
            placeholder={placeholder}
            aria-label={ariaLabel}
        />
    );
};