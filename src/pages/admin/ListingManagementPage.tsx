// src/pages/admin/ListingManagementPage.tsx

import { useMemo, useState } from "react";

import { ProductCardsViewPanel } from "@/features/admin/components/ProductCardsViewPanel";
import { ProductPresentationsViewPanel } from "@/features/admin/components/ProductPresentationsViewPanel";
import { useProductoPresentaciones } from "@/features/admin/hooks/productos/useProductoPresentaciones";
import { useProductos } from "@/features/admin/hooks/productos/useProductos";
import type { ProductoResponse } from "@/types/responses/ProductoResponses";

export const ListingsManagementPage = () => {

  const [selectedProducto, setSelectedProducto] = useState<ProductoResponse | null>(null);

  const {
    productos,
    cantidadesPresentaciones,
    isLoadingProductos,
    productosError,
    refetchProductos,
    setPage,
  } = useProductos();

  const {
    productoPresentaciones,
    isLoadingProductoPresentaciones,
    setPage: setPresentationPage,
  } = useProductoPresentaciones(selectedProducto?.productoId);

  const handleSelectCandidate = (producto: ProductoResponse) => {
    setSelectedProducto(producto);
  };

  const titulo = useMemo(() => {
    if (!selectedProducto) return "Selecciona una presentación disponible";
    return `${selectedProducto.nombreProducto} · ${selectedProducto.autorNombre ?? "Sin autor"} · ${selectedProducto.fechaLanzamiento}`;
  }, [selectedProducto]);

  return (
    <section className="min-h-full bg-white p-4">

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">

        <div>
          {productosError ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-red-200 bg-red-50 p-8 text-center">
              <p className="font-semibold text-red-800">No se pudieron cargar los productos</p>
              <p className="mb-4 text-xs text-red-600">{productosError}</p>
              <button
                onClick={() => refetchProductos()}
                className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Reintentar conexión
              </button>
            </div>
          ) : productos ? (
            <ProductCardsViewPanel
              data={productos}
              selectedProductoId={selectedProducto?.productoId}
              isLoadingProductos={isLoadingProductos}
              cantidadesPresentaciones={cantidadesPresentaciones}
              onSelectProducto={handleSelectCandidate}
              onRefreshProductos={refetchProductos}
              onPageChange={setPage}
            />
          ) : (
            <div className="flex justify-center py-10">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
            </div>
          )}
        </div>

        <div className="space-y-5">
          <section className="rounded-md border border-slate-200 bg-white p-4">
            <div className="mb-4 space-y-2">
              <h2 className="text-sm font-semibold text-slate-900">Crear publicación</h2>
              <p className="text-xs text-slate-500">
                Selecciona un producto y completa los datos para crear una nueva publicación.
              </p>
            </div>

            {!selectedProducto ? (
              <div className="rounded-md border border-dashed border-slate-300 p-6 text-center text-slate-500">
                Selecciona un producto en la lista para asociar la publicación.
              </div>
            ) : (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Publicación en desarrollo</p>
                <p className="mt-2 text-slate-600">
                  La creación de publicaciones aún está en construcción. Puedes seleccionar otro producto mientras tanto.
                </p>
                <p className="mt-4 text-xs text-slate-500">
                  Producto seleccionado: <span className="font-medium text-slate-800">{selectedProducto.nombreProducto}</span>
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-4 inline-flex rounded bg-slate-300 px-4 py-2 text-sm font-medium text-slate-600"
                >
                  Crear publicación (próximamente)
                </button>
              </div>
            )}
          </section>

          <ProductPresentationsViewPanel
            data={productoPresentaciones}
            headerText={titulo}
            isLoadingProductos={isLoadingProductoPresentaciones}
            onPageChange={setPresentationPage}
          />
        </div>
      </div>
    </section>
  );
};

export default ListingsManagementPage;