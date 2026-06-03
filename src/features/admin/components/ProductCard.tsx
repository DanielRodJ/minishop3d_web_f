// src/features/admin/components/ProductCard.tsx

import {
  PlusIcon,
  PencilIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

import { Switch } from "@/components/ui/switch";

import type { ProductoResponse } from "@/types/responses/ProductoResponses";

type EstadoPublicacion = "ACT" | "INA" | "BOR";

interface ProductCardProps {
  producto: ProductoResponse;
  estadoPublicacion?: EstadoPublicacion;
  cantidadPresentaciones?: number;
  cantidadPresentacionesDisponibles?: number;
  isSelected: boolean;
  onSelect: () => void;
  onActionClick?: () => void;
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
  onActionClick,
}: ProductCardProps) => {
  const Icono = estadoPublicacion ? PencilIcon : PlusIcon;

  const mostrarSwitch =
    estadoPublicacion === "ACT" ||
    estadoPublicacion === "INA";

  const estado = estadoPublicacion
    ? ESTADOS[estadoPublicacion]
    : null;

  return (
    <article
      className={`
        relative rounded-md border p-4 shadow-sm
        transition hover:border-black
        ${isSelected
          ? "border-black ring-2 ring-black"
          : "border-slate-300"
        }
      `}
    >
      {isSelected && (
        <CheckCircleIcon
          className="absolute right-3 top-3 h-5 w-5 text-[#612D53]"
        />
      )}

      <button
        type="button"
        onClick={onSelect}
        className="block w-full cursor-pointer text-left"
      >
        {/* TO DO: Reemplazar placeholder por uso de imágenes reales */}
        <div className="mb-3 h-24 rounded bg-slate-100" />

        <div className="space-y-1">
          <h3 className="pr-8 text-sm font-semibold text-slate-900">
            {producto.nombreProducto}
          </h3>

          <p className="text-xs text-slate-600">
            Autor: {producto.autorNombre ?? "N/A"}
          </p>

          <div className="flex flex-col gap-1.5 pt-2">
            <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
              Presentaciones en total:{" "}
              {cantidadPresentaciones ?? "N/A"}
            </span>

            <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
              Presentaciones disponibles:{" "}
              {cantidadPresentacionesDisponibles ?? "N/A"}
            </span>
          </div>
        </div>
      </button>

      <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3">
        <span
          className={`text-sm font-medium ${estado?.color ?? "text-slate-500"
            }`}
        >
          {estado?.label ?? "Sin estado"}
        </span>

        <div className="flex items-center gap-2">
          {mostrarSwitch && (
            <Switch
              size="sm"
              checked={estadoPublicacion === "ACT"}
              disabled
            />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onActionClick?.();
            }}
            aria-label={
              estadoPublicacion
                ? "Editar producto"
                : "Agregar producto"
            }
            className="
              cursor-pointer rounded-md p-1
              text-slate-500 hover:bg-slate-100
            "
          >
            <Icono className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};