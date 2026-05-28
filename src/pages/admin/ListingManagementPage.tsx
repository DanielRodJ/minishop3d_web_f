// src/pages/admin/ListingManagementPage.tsx

import { useMemo, useState } from "react";

import { useProductoPresentaciones } from "@/features/admin/hooks/productos/useProductoPresentaciones";
import { useProductos } from "@/features/admin/hooks/productos/useProductos";
import { useAddPublicacionForm } from "@/features/admin/hooks/usePublicacionForm";

import { ProductCardsViewPanel } from "@/features/admin/components/ProductCardsViewPanel";
import { ProductPresentationsViewPanel } from "@/features/admin/components/ProductPresentationsViewPanel";
import { Toast } from "@/components/ui/Toast";

import type { ProductoResponse } from "@/types/responses/ProductoResponses";
export const ListingsManagementPage = () => {

  const [selectedProducto, setSelectedProducto] = useState<ProductoResponse | null>(null);
  // const [estadoOptions, setEstadoOptions] = useState<SelectOption[]>([]);

  const form = useAddPublicacionForm({
    onSuccess: async () => {
      setSelectedProducto(null);
    }
  });

  const {
    fetchProductos,
    productos,
    isLoadingProductos,
    productosError,
    clearProductosError,
  } = useProductos();

  const {
    fetchProductoPresentaciones,
    productoPresentaciones,
    isLoadingProductoPresentaciones,
  } = useProductoPresentaciones();

  const handleSelectCandidate = (producto: ProductoResponse) => {
    setSelectedProducto(producto);
    form.handleSelectChange("productoId", producto.productoId);
    fetchProductoPresentaciones(producto.productoId);
  };

  const selectedPresentationId = selectedProducto?.productoId;

  const headerText = useMemo(() => {
    if (!selectedProducto) return "Selecciona una presentacion disponible";

    return `${selectedProducto.nombreProducto} · ${selectedProducto.autorNombre ?? "Sin autor"} · ${selectedProducto.fechaLanzamiento}`;
  }, [selectedProducto]);

  return (
    <section className="min-h-full bg-white p-4">
      <div className="mb-4 border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900">
          Publicaciones
        </h1>
        <p className="text-sm text-slate-500">
          Creación de publicaciones a partir de productos con presentaciones disponibles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
        {productos && (
          <ProductCardsViewPanel
            data={productos}
            selectedProductoId={selectedPresentationId}
            isLoadingProductos={isLoadingProductos}
            onSelectProducto={handleSelectCandidate}
            onRefreshProductos={fetchProductos}
          />
        )}

        <ProductPresentationsViewPanel
          data={productoPresentaciones}
          headerText={headerText}
          isLoadingProductos={isLoadingProductoPresentaciones}
        />
      </div>

      {productosError && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast
            message={productosError}
            onClose={clearProductosError}
          />
        </div>
      )}

    </section>
  );
};

export default ListingsManagementPage;