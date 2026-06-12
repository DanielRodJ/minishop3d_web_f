// src/pages/admin/ListingManagementPage.tsx

// Librerías externas.
import { useCallback, useMemo, useState } from "react";

// Componentes.
import { ProductCardsViewPanel } from "@/features/admin/components/ProductCardsViewPanel";
import { ProductPresentationsViewPanel } from "@/features/admin/components/ProductPresentationsViewPanel";

import { FormModal } from "@/features/admin/components/FormModal";
import { FormPublicacionFields } from "@/features/admin/components/FormPublicacionFields";

import { DataState } from "@/features/admin/DataState";
import { Pagination } from "@/features/admin/components/Pagination";

// Hooks.
import { useProductoPresentaciones } from "@/features/admin/hooks/productos/useProductoPresentaciones";
import { useProductos } from "@/features/admin/hooks/productos/useProductos";

import {
  getInitialPublicacion,
  useAddPublicacionMutation,
  useUpdateEstadoPublicacionMutation,
} from "@/features/admin/hooks/publicacion/usePublicacionMutations";

// Types.
import type { ProductoResponse } from "@/types/responses/ProductoResponses";

const estadoOptions = [
  { value: "ACT", label: "Activa" },
  { value: "INA", label: "Inactiva" },
];

export const ListingsManagementPage = () => {
  
  const [selectedProducto, setSelectedProducto] = useState<ProductoResponse | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);

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
    setProductoPresentacionesPage,
  } = useProductoPresentaciones(selectedProducto?.productoId);

  const initialAddData = useMemo(
    () => getInitialPublicacion(selectedProducto?.productoId ?? 0),
    [selectedProducto]
  );
  const selectedPresentationId = selectedProducto?.productoId;

  const handleOpenForm = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setFormOpen(false);
    setSelectedProducto(null);
  }, []);

  const handleSelectProducto = useCallback(
    (producto: ProductoResponse) => {
      setSelectedProducto(producto);
      setProductoPresentacionesPage(1);
    },
    [setProductoPresentacionesPage]
  );

  const addMutation = useAddPublicacionMutation(initialAddData, handleCloseForm);
  const updateEstadoMutation = useUpdateEstadoPublicacionMutation();

  const handleUpdateEstado = useCallback(
    (productoId: number, checked: boolean) => {
      updateEstadoMutation.mutate({
        productoId,
        estadoPublicacionCodigo: checked ? "ACT" : "INA",
      });
    },
    [updateEstadoMutation]
  );

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
            <div className="space-y-2">
              <ProductCardsViewPanel
                items={productos.items}
                cantidadesPresentaciones={cantidadesPresentaciones}
                selectedProductoId={selectedPresentationId}
                onSelectProducto={handleSelectProducto}
                onOpenForm={handleOpenForm}
                onRefreshProductos={refetchProductos}
                onChecked={handleUpdateEstado}
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
            titulo="Presentaciones disponibles"
            subtitulo="Las presentaciones mostradas serán puestas en la publicación."
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

      <FormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        tituloModal="Crear publicación"
        textoEnEnvio="Crear publicación"
        onSubmit={addMutation.handleSubmit}
        disabled={addMutation.isSubmitting}
        submitError={addMutation.submitError}
      >
        <FormPublicacionFields
          formData={addMutation.formData}
          handleChange={addMutation.handleChange}
          handleSelectChange={addMutation.handleSelectChange}
          fieldErrors={addMutation.fieldErrors}
          disabled={addMutation.isSubmitting}
          estadoOptions={estadoOptions}
        />
      </FormModal>
    </section>
  );
};

export default ListingsManagementPage;
