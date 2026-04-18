import React from "react";
import { InputBase } from "./InputBase";
import type { InputVariant, InputSize } from "./InputBase";

export interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "size"
  > {
  label?: string;
  size?: InputSize;
  variant?: InputVariant;
}

export const DatePicker = ({
  label,
  id = "date",
  name = "date",
  className = "",
  size = "md",
  variant = "default",
  ...props
}: DatePickerProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm text-gray-600">
          {label}
        </label>
      )}

      <InputBase
        type="date"
        id={id}
        name={name}
        size={size}
        variant={variant}
        className={className}
        {...props}
      />
    </div>
  );
};