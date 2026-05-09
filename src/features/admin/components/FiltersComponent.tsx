// src/features/admin/components/FiltersComponents.tsx

import { useRef } from "react";
import { SearchBarCustom } from "@/components/shared/SearchBarComponents";

type Props = {
    filtersAreOpen: boolean;
};

export const FiltersComponent = ({ filtersAreOpen }: Props) => {

    const filtersRef = useRef<HTMLDivElement>(null);

    return (
        <aside
            ref={filtersRef}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
                maxWidth: filtersAreOpen 
                ? (filtersRef.current?.scrollWidth ?? 220) 
                : 0.
            }}
        >
            <div className="bg-red-500 p-2">
                <h2 className="text-white font-bold">Filtros</h2>
                <>
                    <SearchBarCustom preset="searchBarFilter"/>
                </>
            </div>
        </aside>
    );
};