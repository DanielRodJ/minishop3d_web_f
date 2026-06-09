// src/features/admin/components/ProductCard.tsx

// Librerías externas.
import {CheckCircleIcon} from "@heroicons/react/24/solid";

// Componentes.
import { Switch } from "@/components/ui/switch";

// Types.
import type { EstadoPublicacion } from "@/types/shared/EstadoPublicacion";
import type { ProductoResponse } from "@/types/responses/ProductoResponses";

interface ProductCardProps {
  producto: ProductoResponse;
  estadoPublicacion?: EstadoPublicacion;
  cantidadPresentaciones?: number;
  cantidadPresentacionesDisponibles?: number;
  isSelected: boolean;
  onSelect: () => void;
  onChecked?: (estado: boolean) => void;
}

const ESTADOS = {
  ACT: {
    label: "Activo",
    color: "text-green-600",
  },
  INA: {
    label: "Inactivo",
    color: "text-yellow-600",
  },
  BOR: {
    label: "Borrado",
    color: "text-red-600",
  },
} as const;

export const ProductCard = ({
  producto,
  estadoPublicacion,
  cantidadPresentaciones,
  cantidadPresentacionesDisponibles,
  isSelected,
  onSelect,
  onChecked,
}: ProductCardProps) => {

  const mostrarSwitch =
    estadoPublicacion === "ACT" ||
    estadoPublicacion === "INA";

  const estado = estadoPublicacion
    ? ESTADOS[estadoPublicacion]
    : null;

  return (
    <article
      className={`relative rounded-md border p-4 shadow-xs
        transition hover:border-black hover:ring-2
        ${isSelected
          ? "border-black ring-2 ring-black"
          : "border-slate-300"
        }
      `}
    >
      {isSelected && (
        <CheckCircleIcon className="absolute right-2 top-2 h-6 w-6 text-[#612D53]" />
      )}

      <button
        type="button"
        onClick={onSelect}
        className="block w-full text-left cursor-pointer"
      >
        {/* TO DO: Reemplazar placeholder por uso de imágenes reales */}
        <div className="mb-3 h-24 rounded bg-slate-100" />

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-900 truncate">
            {producto.nombreProducto}
          </h3>
          <p className="text-xs text-slate-600 truncate">
            Autor: {producto.autorNombre ?? "N/A"}
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-600">
            <div className="flex items-center justify-between rounded bg-slate-100 px-2 py-1">
              <span>Total</span>
              <span>
                {cantidadPresentaciones ?? "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded bg-slate-100 px-2 py-1">
              <span>Disponibles</span>
              <span>
                {cantidadPresentacionesDisponibles ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </button>

      <div className="mt-4 flex items-center justify-between gap 2 border-t pt-2" >
        <span
          className={`text-sm font-medium 
            ${estado?.color ?? "text-slate-500"}`}
        >
          {estado?.label ?? "N/A"}
        </span>

        <div className="flex items-center gap-2">
          {mostrarSwitch && (
            <Switch
              size="sm"
              checked={estadoPublicacion === "ACT"}
              onCheckedChange={onChecked}
            />
          )}
        </div>
      </div>
    </article>
  );
};