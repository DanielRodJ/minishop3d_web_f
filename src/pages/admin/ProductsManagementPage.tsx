// src/pages/admin/ProductsManagementPage.tsx

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchBarCustom } from "@/components/shared/SearchBarComponents";
import { ButtonCustom } from "@/components/ui/Buttons";
import { Spinner } from "@/components/ui/Spinner";
import { Toast } from "@/components/ui/Toast";

import { FiltersComponent } from "@/features/admin/components/FiltersComponent";
import { FormProducto } from "@/features/admin/components/FormsProduct";
import { Table, type Column } from "@/features/admin/components/TableTemplate";

import {
  getInitialProducto,
  useAddProductoForm,
  useUpdateProductoForm
} from "@/features/admin/hooks/useProductosForm";

import { useProducto } from "@/features/admin/hooks/productos/useProducto";
import { useProductos } from "@/features/admin/hooks/productos/useProductos";

import type { UpdateProductoCommand } from "@/types/ProductoCommand";

import type {
  ProductoDetalladoResponse,
  ProductoResponse
} from "@/types/responses/ProductoResponses";

// método para mapear response a command.
// preparación de datos para mostrar en formulario.
function buildUpdateProductoCommand(
  p: ProductoDetalladoResponse
): UpdateProductoCommand {
  return {
    productoId: p.productoId,
    nombreProducto: p.nombreProducto,
    descripcionProducto: p.descripcionProducto,
    autorNombre: p.autorNombre ?? undefined,
    fechaLanzamiento: p.fechaLanzamiento,
    coleccionId: p.coleccionId ?? undefined
  };
}

// valor inicial para mantener tipado y estado controlado del formulario.
const EMPTY_UPDATE_PRODUCTO_FORM: UpdateProductoCommand = {
  productoId: 0,
  ...getInitialProducto()
};

export const ProductsManagementPage = () => {
  const navigate = useNavigate();

  const [areFiltersOpen, setFiltersOpen] = useState(false);
  const [isAddRecordFormOpen, setAddRecordFormOpen] = useState(false);
  const [isModifyRecordFormOpen, setModifyRecordFormOpen] = useState(false);
  const [selectedProductoId, setSelectedProductoId] = useState<number | null>(null);
  const [showProductoErrorToast, setShowProductoErrorToast] = useState(false);

  const {
    productos,
    isLoadingProductos,
    productosError,
    refetchProductos,
    setPage,
    setSearch,
  } = useProductos();

  const {
    producto,
    isLoadingProducto,
    productoError,
  } = useProducto(
    isModifyRecordFormOpen
      ? selectedProductoId ?? undefined
      : undefined
  );

  const columnsTable = [
    { header: "ID", key: "productoId" },
    { header: "Nombre", key: "nombreProducto" },
    {
      header: "Colección",
      render: (p: ProductoResponse) => p.coleccion?.nombre ?? "-"
    },
    { header: "Autor", key: "autorNombre" },
    {
      header: "Fecha",
      render: (p: ProductoResponse) =>
        new Date(p.fechaLanzamiento).toLocaleDateString()
    },
    {
      header: "Opciones",
      render: (p: ProductoResponse) => (
        <div className="flex gap-1.5">
          <ButtonCustom
            preset="tableModify"
            onClick={() => handleOpenModifyRecordForm(p.productoId)}
          />
          <ButtonCustom
            preset="tableInfo"
            aria-label="Administrar presentaciones"
            title="Presentaciones"
            onClick={() =>
              navigate(`/admin/products/${p.productoId}/presentaciones`)
            }
          />
        </div>
      )
    }
  ] satisfies Column<ProductoResponse>[];

  // valores vacíos iniciales del formulario de actualización.
  const updateInitialUpdateFormData = useMemo(
    () =>
      producto
        ? buildUpdateProductoCommand(producto)
        : EMPTY_UPDATE_PRODUCTO_FORM,
    [producto]
  );

  // método: cerrar formulario para añadir un nuevo producto.
  const handleCloseAddForm = () => {
    setAddRecordFormOpen(false);
  };

  // método: cerrar formulario para modificar un producto.
  const handleCloseUpdateForm = () => {
    setModifyRecordFormOpen(false);
    setSelectedProductoId(null);
  };

  const addProductoForm = useAddProductoForm({
    // si la operación es exitosa:
    // cerrar la ventana de addRecordForm
    // actualizar la lista de productos.
    onSuccess: async () => {
      handleCloseAddForm();
      await refetchProductos();
    }
  });

  const updateProductoForm = useUpdateProductoForm({
    // envío de datos iniciales para updateRecordForm
    initialData: updateInitialUpdateFormData,
    // cerrar la ventana de updateRecordForm
    // actualizar la lista de productos.
    onSuccess: async () => {
      handleCloseUpdateForm();
      await refetchProductos();
    }
  });

  // método para actualización de término de búsqueda y página.
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, [setPage, setSearch]);

  // método de botón para abrir modal en base a id asociado.
  const handleOpenModifyRecordForm = (id: number) => {
    setSelectedProductoId(id);
    setModifyRecordFormOpen(true);
  };

  useEffect(() => {
    if (productoError) {
      setShowProductoErrorToast(true);
    }
  }, [productoError]);

  return (
    <div className="relative flex">
      <header className="w-full rounded-md border border-slate-200 bg-white p-2">
        <h1 className="text-lg font-bold text-black">
          Productos registrados
        </h1>

        <div className="my-4 flex flex-wrap items-center justify-end gap-2">
          <div className="flex-1">
            <SearchBarCustom
              preset="searchBarTable"
              onSearch={handleSearch}
            />
          </div>

          <ButtonCustom
            preset="addRecord"
            onClick={() => setAddRecordFormOpen(true)}
          />

          <ButtonCustom preset="generateDocument" />

          <ButtonCustom
            preset="filters"
            onClick={() => setFiltersOpen(prev => !prev)}
          />
        </div>

        {isLoadingProductos ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : productosError ? (
          <div className="p-4 text-center text-red-600">
            {productosError}
          </div>
        ) : productos && productos.items.length > 0 ? (
          <Table
            columns={columnsTable}
            data={productos}
            onPageChange={setPage}
            getRowId={(p) => p.productoId}
          />
        ) : productos && productos.items.length === 0 ? (
          <div className="p-4 text-center">
            No hay productos registrados
          </div>
        ) : null}
      </header>

      <FiltersComponent filtersAreOpen={areFiltersOpen} />

      {isAddRecordFormOpen && (
        <FormProducto
          mod="add"
          formData={addProductoForm.formData}
          handleChange={addProductoForm.handleChange}
          handleSubmit={addProductoForm.handleSubmit}
          fieldErrors={addProductoForm.fieldErrors}
          submitError={addProductoForm.submitError}
          onClose={handleCloseAddForm}
          disabled={addProductoForm.isSubmitting}
        />
      )}

      {isModifyRecordFormOpen && isLoadingProducto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-md bg-white p-6 shadow-2xl">
            <Spinner />
          </div>
        </div>
      )}

      {showProductoErrorToast && productoError && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast
            message={productoError}
            onClose={() => setShowProductoErrorToast(false)}
          />
        </div>
      )}

      {isModifyRecordFormOpen &&
        producto &&
        producto.productoId === selectedProductoId && (
          <FormProducto
            key={producto.productoId}
            mod="update"
            formData={updateProductoForm.formData}
            handleChange={updateProductoForm.handleChange}
            handleSubmit={updateProductoForm.handleSubmit}
            fieldErrors={updateProductoForm.fieldErrors}
            submitError={updateProductoForm.submitError}
            onClose={handleCloseUpdateForm}
            disabled={updateProductoForm.isSubmitting}
          />
        )}
    </div>
  );
};

export default ProductsManagementPage;