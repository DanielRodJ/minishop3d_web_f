import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

type SearchBarVariant = "default" | "filter";

const variantStyles: Record<SearchBarVariant, string> = {
    default: "bg-gray-200 border",
    filter: "bg-blue-100 border-blue-300"
};

type SearchBarCustomProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className"
> & {
    variant?: SearchBarVariant;
};

export type SearchBarProps = {
    placeholder?: string;
    id?: string;
    name?: string;
}

export const SearchBarFilters = ({
    placeholder,
    id = "search-bar-filters",
    name = "search"
}: SearchBarProps) => (
    <SearchBarCustom
        id={id}
        name={name}
        type="search"
        placeholder={placeholder}
        variant="filter"
    />
);

export const SearchBarTable = ({
    placeholder,
    id = "search-bar-table",
    name = "search"
}: SearchBarProps) => (
    <SearchBarCustom
        id={id}
        name={name}
        type="search"
        placeholder={placeholder}
        variant="default"
    />
);

const SearchBarCustom = ({
    variant = "default",
    placeholder,
    id,
    ...props
}: SearchBarCustomProps) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassCircleIcon className="h-5 w-5 text-zinc-400" />
            </div>

            <input
                id={id}
                type="search"
                placeholder={placeholder}
                aria-label={placeholder || "Search"}
                {...props}
                className={`${variantStyles[variant]} w-full rounded-lg pl-10 pr-4 py-1.5 font-body text-sm text-black focus:outline-none focus:ring-1 focus:ring-black`}
            />
        </div>
    );
};