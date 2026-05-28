// src/features/admin/components/ProductDetailedCard.tsx

import type { ProductoResponse } from "@/types/responses/ProductoResponses";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface ProductCardProps {
  productoDetallado: ProductoResponse;
  isSelected: boolean;
  onSelect: () => void;
};

export const ProductCard = ({
  productoDetallado,
  isSelected,
  onSelect
}: ProductCardProps) => {

  return (
    <>
      <button
        type="button"
        onClick={onSelect}
        className={`relative rounded-md border p-4 text-left shadow-sm    
          transition hover:border-black
          cursor-pointer
        ${isSelected ? "ring-4 ring-red-500/20" : "border-slate-300"}`}
      >
        {isSelected && (
          <CheckCircleIcon className="absolute right-3 top-3 h-5 w-5 text-[#612D53]" />
        )}

        {/* TO DO: Reemplazar placeholder por uso de imagenes reales. */}
        <div className="mb-3 h-24 rounded bg-slate-100" />

        <div className="space-y-1">
          <h3 className="pr-8 text-sm font-semibold text-slate-900">
            {productoDetallado.nombreProducto}
          </h3>
          <p className="text-xs text-slate-600">
            {productoDetallado.autorNombre ?? "Autor no registrado"} ·
          </p>
          <div className="flex flex-col gap-1.5 pt-2">
            <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
              Presentaciones en total: {1}
            </span>
            <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
              Presentaciones en estado disponible: {2}
            </span>
          </div>
        </div>
      </button>
    </>
  );
};