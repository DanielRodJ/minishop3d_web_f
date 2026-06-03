// src/features/admin/components/ProductCardsViewPanel.tsx

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

import { ButtonCustom } from "@/components/ui/Buttons";
import { Spinner } from "@/components/ui/Spinner";

import type {
  ProductoResponse,
  CantidadesPresentacionesResponse,
} from "@/types/responses/ProductoResponses";

import { ProductCard } from "@/features/admin/components/ProductCard";

interface ProductCardsViewPanelProps {
  data: {
    items: ProductoResponse[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  };
  cantidadesPresentaciones?: CantidadesPresentacionesResponse | null;
  isLoadingProductos?: boolean;
  selectedProductoId?: number;
  onSelectProducto: (producto: ProductoResponse) => void;
  onRefreshProductos?: () => void;
  onPageChange?: (page: number) => void;
}

export const ProductCardsViewPanel = ({
  data,
  cantidadesPresentaciones,
  selectedProductoId,
  isLoadingProductos,
  onRefreshProductos,
  onSelectProducto,
  onPageChange,
}: ProductCardsViewPanelProps) => {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Productos disponibles
          </h2>

          <p className="text-xs text-slate-500">
            {data.totalItems} productos encontrados
          </p>
        </div>

        <ButtonCustom
          preset="reloadData"
          onClick={onRefreshProductos}
        />
      </header>

      <div>
        {isLoadingProductos ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : !data.items || data.items.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No hay productos con presentaciones válidas por publicar.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((pd) => {
              const cantidades = cantidadesPresentaciones?.find(
                (c) => c.productoId === pd.productoId
              );

              return (
                <ProductCard
                  key={pd.productoId}
                  producto={pd}
                  isSelected={
                    selectedProductoId === pd.productoId
                  }
                  cantidadPresentaciones={
                    cantidades?.cantidadTotalPresentaciones
                  }
                  cantidadPresentacionesDisponibles={
                    cantidades?.cantidadPresentacionesEnEstadoDisponible
                  }
                  onSelect={() => onSelectProducto(pd)}
                />
              );
            })}
          </div>
        )}
      </div>

      <footer className="flex items-center justify-center gap-2">
        <button
          disabled={isLoadingProductos || data.pageNumber === 1}
          onClick={() => onPageChange?.(data.pageNumber - 1)}
          className="
            rounded-full bg-zinc-900 p-1 text-white
            transition-all duration-200 hover:bg-zinc-800
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        <span
          className="flex size-12 items-center justify-center rounded-full bg-white text-sm font-bold text-zinc-900"
          title={`Página ${data.pageNumber} de ${data.totalPages}`}
        >
          {isLoadingProductos ? (
            <Spinner />
          ) : (
            data.pageNumber
          )}
        </span>

        <button
          disabled={
            isLoadingProductos ||
            data.pageNumber === data.totalPages
          }
          onClick={() => onPageChange?.(data.pageNumber + 1)}
          className="
            rounded-full bg-zinc-900 p-1 text-white
            transition-all duration-200 hover:bg-zinc-800
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </footer>
    </section>
  );
};