// src/features/admin/components/ProductCardsViewPanel.tsx

import { ButtonCustom } from "@/components/ui/Buttons";

import type {
  ProductoResponse,
  CantidadesPresentacionesResponse,
} from "@/types/responses/ProductoResponses";

import { ProductCard } from "@/features/admin/components/ProductCard";

interface ProductCardsViewPanelProps {
  items: ProductoResponse[];
  cantidadesPresentaciones?: CantidadesPresentacionesResponse | null;
  selectedProductoId?: number;
  onSelectProducto: (producto: ProductoResponse) => void;
  onRefreshProductos?: () => void;
}

export const ProductCardsViewPanel = ({
  items,
  cantidadesPresentaciones,
  selectedProductoId,
  onRefreshProductos,
  onSelectProducto,
}: ProductCardsViewPanelProps) => {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Productos disponibles
          </h2>

          <p className="text-xs text-slate-500">
            {cantidadesPresentaciones?.length} productos encontrados
          </p>
        </div>

        <ButtonCustom
          preset="reloadData"
          onClick={onRefreshProductos}
        />
      </header>

      <div>
        {items.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No hay registros.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((pd) => {
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
    </section>
  );
};