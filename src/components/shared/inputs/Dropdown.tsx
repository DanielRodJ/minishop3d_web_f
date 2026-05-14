import Select from "react-select";

import { ErrorMessage } from "@/components/shared/feedback/ErrorMessage";

export type SelectOption = {
  value: string | number;
  label: string;
};

type DropdownProps = {
  id?: string;
  name: string;
  value?: string | number;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onChange: (name: string, value: string | number) => void;
};

export const Dropdown = ({
  id,
  name,
  value,
  options,
  placeholder = "Selecciona una opcion",
  disabled,
  error,
  onChange
}: DropdownProps) => {

  const selectedOption =
    options.find(option => option.value === value) ?? null;

  const hasError = !!error;

  return (
    <div>
      <Select
        inputId={id ?? name}
        name={name}
        value={selectedOption}
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
        onChange={(option) => {
          if (option) onChange(name, option.value);
        }}
        classNames={{
          control: () =>
            `!min-h-[38px] !rounded-md !border !shadow-none ${
              hasError
                ? "!border-red-500"
                : "!border-gray-300"
            }`,
          valueContainer: () => "!px-3",
          input: () => "!text-sm",
          option: () => "!text-sm",
        }}
      />

      {error && (
        <ErrorMessage message={error} />
      )}
    </div>
  );
};