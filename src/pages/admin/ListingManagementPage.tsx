// src/pages/admin/ListingManagementPage.tsx

// Librerías externas.
import { useState } from "react";

// Componentes.
import { ProductCardsViewPanel } from "@/features/admin/components/ProductCardsViewPanel";
import { ProductPresentationsViewPanel } from "@/features/admin/components/ProductPresentationsViewPanel";
import { Pagination } from "@/features/admin/components/Pagination";
import { DataState } from "@/features/admin/DataState";

// Hooks.
import { useProductoPresentaciones } from "@/features/admin/hooks/productos/useProductoPresentaciones";
import { useProductos } from "@/features/admin/hooks/productos/useProductos";
import { useAddPublicacionMutation, useUpdateEstadoPublicacionMutation } from "@/features/admin/hooks/publicacion/usePublicacionMutations";

// Types.
import type { ProductoResponse } from "@/types/responses/ProductoResponses";

export const ListingsManagementPage = () => {

  const [isAddRecordFormOpen, setAddRecordFormOpen] = useState(false);
  const [isModifyRecordFormOpen, setModifyRecordFormOpen] = useState(false);
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
    setProductoPresentacionesPage
  } = useProductoPresentaciones(selectedProducto?.productoId);


  const addPublicacionMutation = useAddPublicacionMutation({
    // envío de id para llenada de campo productoId.
    productoId: selectedProducto?.productoId ?? 0,
    // si la operación es exitosa:
    // cambiamos selectedProducto a null para cerrar la ventana de addRecordForm.
    onSuccess: () => {
      setSelectedProducto(null);
    }
  });

  const updateEstadoMutation = useUpdateEstadoPublicacionMutation();

  const handleSelectProductoCandidate = (producto: ProductoResponse) => {
    setSelectedProducto(producto);
    addPublicacionMutation.handleSelectChange("productoId", producto.productoId);
    setProductoPresentacionesPage(1);
  };

  const handleUpdateEstadoPublicacion = (
    productoId: number,
    checked: boolean
  ) => {
    updateEstadoMutation.mutate({
      productoId,
      estadoPublicacionCodigo: checked
        ? "ACT"
        : "INA",
    });
  };

  const selectedPresentationId = selectedProducto?.productoId;

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
        <DataState
          isLoading={isLoadingProductos}
          error={productosError}
        >
          {productos && (
            <div className="space-y-2 ">
              <ProductCardsViewPanel
                items={productos.items}
                cantidadesPresentaciones={cantidadesPresentaciones}
                selectedProductoId={selectedPresentationId}
                onSelectProducto={handleSelectProductoCandidate}
                onRefreshProductos={refetchProductos}
                onChecked={handleUpdateEstadoPublicacion}
              />
              <Pagination
                pageNumber={productos.pageNumber}
                totalPages={productos.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </DataState>

        <div className="space-y-2">
          <ProductPresentationsViewPanel
            items={productoPresentaciones?.items ?? []}
            titulo={"Presentaciones disponibles"}
            subtitulo={"Las presentaciones mostradas serán puestas en la publicación."}
            editable={false}
            layout="amplio"
          />
          <Pagination
            pageNumber={productoPresentaciones?.pageNumber ?? 1}
            totalPages={productoPresentaciones?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>
      </div>
    </section>
  );
};

export default ListingsManagementPage;
