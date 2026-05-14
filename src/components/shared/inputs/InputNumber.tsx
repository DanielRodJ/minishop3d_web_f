import React from "react";
import { InputBase } from "./InputBase";
import type { InputVariant, InputSize } from "./InputBase";
import { ErrorMessage } from "../feedback/ErrorMessage";

// TO DO: Cambiar nombre de archivo a FieldNumber

type InputNumberProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: string;
};

export const InputNumber = ({
  id,
  variant = "default",
  size = "md",
  label,
  error,
  ...props
}: InputNumberProps) => {

  const inputVariant = error ? "error" : variant;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <InputBase
        {...props}
        id={id}
        type="number"
        variant={inputVariant}
        size={size}
        min={0}
      />

      {error && (
        <ErrorMessage message={error} />
      )}
    </div>
  );
};