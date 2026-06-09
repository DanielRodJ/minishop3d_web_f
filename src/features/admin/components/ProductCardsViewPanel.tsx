// src/features/admin/components/ProductCardsViewPanel.tsx

// Componentes.
import { ProductCard } from "@/features/admin/components/ProductCard";
import { ButtonCustom } from "@/components/ui/Buttons";

// Types.
import type {
  ProductoResponse,
  CantidadesPresentacionesResponse,
} from "@/types/responses/ProductoResponses";

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
  onSelectProducto,
  onRefreshProductos,
}: ProductCardsViewPanelProps) => {

  const selectedProducto = items.find(
    (p) => p.productoId === selectedProductoId
  );

  const esNuevo = !selectedProducto?.estadoPublicacionCodigo
    || selectedProducto.estadoPublicacionCodigo === "BOR";

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Productos disponibles
          </h2>
          <p className="text-xs text-slate-500">
            {cantidadesPresentaciones?.length ?? 0} productos encontrados
          </p>
        </div>

        <div className="flex gap-2">
          <ButtonCustom
            preset="reloadData"
            onClick={onRefreshProductos}
          />
          {selectedProducto && (
            <ButtonCustom
              preset={esNuevo ? "addRecord" : "modifyRecord"}
              onClick={() => console.log("temp")}
            />
          )}
        </div>
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
                  estadoPublicacion={pd.estadoPublicacionCodigo}
                  cantidadPresentaciones={cantidades?.cantidadTotalPresentaciones}
                  cantidadPresentacionesDisponibles={cantidades?.cantidadPresentacionesEnEstadoDisponible}
                  isSelected={selectedProductoId === pd.productoId}
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