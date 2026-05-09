// src/components/shared/SearchBarComponents.tsx

import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type SearchBarVariant = "shopDefault" | "adminFilter";

/* =========================================================
    Variants
   ========================================================= */

const variantStyles: Record<SearchBarVariant, string> = {
    shopDefault: "bg-gray-200 border",
    adminFilter: "bg-blue-100 border-blue-300"
};

/* =========================================================
    Presets
   ========================================================= */

type SearchBarPresetConfig = {
    placeholder: string;
    variant: SearchBarVariant;
};

const searchBarPresets: Record<string, SearchBarPresetConfig> = {
    searchBarFilter: {
        placeholder: "Buscar",
        variant: "adminFilter",
    },
    searchBarTable: {
        placeholder: "Buscar",
        variant: "shopDefault",
    }
}

type SearchBarPreset = keyof typeof searchBarPresets;

/* =========================================================
    Props
   ========================================================= */

interface SearchBarCustomProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "onChange"> {
    placeholder?: string;
    variant?: SearchBarVariant;
    onSearch?: (value: string) => void;
    preset?: SearchBarPreset;
    debounceTime?: number;
}

/* =========================================================
    Componente base
   ========================================================= */

export const SearchBarCustom = ({
    preset,
    placeholder,
    variant = "shopDefault",
    onSearch,
    debounceTime = 500,
    ...props
}: SearchBarCustomProps) => {

    const [searchTerm, setSearchTerm] = useState("");

    const presetConfig = preset ? searchBarPresets[preset] : undefined;
    const finalPlaceholder = presetConfig?.placeholder ?? placeholder;
    const finalVariant = presetConfig?.variant ?? variant;

    useEffect(() => {
        const handler = setTimeout(() => {
            if(onSearch) onSearch(searchTerm);
        }, debounceTime);

        return () => clearTimeout(handler);
    }, [searchTerm, onSearch, debounceTime]);

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassCircleIcon className="h-5 w-5 text-zinc-400" />
            </div>

            <input
                {...props}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full rounded-lg pl-10 pr-4 py-1.5 font-body text-sm text-black focus:outline-none focus:ring-1 focus:ring-black ${variantStyles[finalVariant]}`}
                type="search"
                placeholder={finalPlaceholder}
            />
        </div>
    );
};