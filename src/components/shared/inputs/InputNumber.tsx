import React from "react";
import { InputBase } from "./InputBase";
import type { InputVariant, InputSize } from "./InputBase";

type InputNumberProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  variant?: InputVariant;
  size?: InputSize;
};

export const InputNumber = ({
  variant = "default",
  size = "md",
  ...props
}: InputNumberProps) => {
  return (
    <InputBase
      {...props}
      type="number"
      variant={variant}
      size={size}
    />
  );
};