// src/pages/admin/ProductsManagementPage.tsx

// Librerías externas.
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Componentes.
import { SearchBarCustom } from "@/components/shared/SearchBarComponents";
import { ButtonCustom } from "@/components/ui/Buttons";
import { Spinner } from "@/components/ui/Spinner";
import { Toast } from "@/components/ui/Toast";

import { DataState } from "@/features/admin/DataState";

import { FiltersComponent } from "@/features/admin/components/FiltersComponent";
import { FormProducto } from "@/features/admin/components/FormsProduct";
import { Pagination } from "@/features/admin/components/Pagination";
import { Table, type Column } from "@/features/admin/components/TableTemplate";

// Hooks.
import { useProducto } from "@/features/admin/hooks/productos/useProducto";
import { useProductos } from "@/features/admin/hooks/productos/useProductos";

import {
  getInitialProducto,
  useAddProductoMutation,
  useUpdateProductoMutation,
} from "@/features/admin/hooks/productos/useProductoMutations";

// Types.
import type { UpdateProductoCommand } from "@/types/commands/ProductoCommands";

import type {
  ProductoDetalladoResponse,
  ProductoResponse
} from "@/types/responses/ProductoResponses";

// método para mapear response a command.
// preparación de datos para mostrar en formulario.
function mapProductoDetalladoToCommand(
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
    setPage,
    setSearch,
    sortBy,
    setSortBy,
    sortDescending,
    setSortDescending
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
    { header: "ID", accessor: "productoId" },
    { header: "NOMBRE", accessor: "nombreProducto", sortKey: "nombre" },
    {
      header: "COLECCIÓN",
      render: (p: ProductoResponse) => p.coleccion?.nombre ?? "-"
    },
    { header: "AUTOR", accessor: "autorNombre", sortKey: "autor"},
    {
      header: "FECHA",
      sortKey: "fecha",
      render: (p: ProductoResponse) =>
        new Date(p.fechaLanzamiento).toLocaleDateString(),
    },
    {
      header: "OPCIONES",
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
        ? mapProductoDetalladoToCommand(producto)
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

  const addProductoMutation = useAddProductoMutation({
    // si la operación es exitosa:
    // cerrar la ventana de addRecordForm
    onSuccess: () => {
      handleCloseAddForm();
    }
  });

  const updateProductoMutation = useUpdateProductoMutation({
    // envío de datos iniciales para updateRecordMutation
    initialData: updateInitialUpdateFormData,
    // cerrar la ventana de updateRecordForm
    onSuccess: () => {
      handleCloseUpdateForm();
    }
  });

  // método para actualización de término de búsqueda y página.
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, [setPage, setSearch]);

  // método para actualización de término de ordenamiento y dirección.
  const handleSort = (column: string) => {
    if (sortBy !== column) {
      setSortBy(column);
      setSortDescending(false);
      return;
    }

    if (sortDescending === false) {
      setSortDescending(true);
      return;
    }

    setSortBy(undefined);
    setSortDescending(undefined);
  };

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
        <h1 className="text-lg font-bold text-black pl-2">
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

        <DataState
          isLoading={isLoadingProductos}
          error={productosError}
        >
          {productos && (
            <div className="space-y-3">
              <Table
                columns={columnsTable}
                data={productos.items}
                getRowId={(p) => p.productoId}
                sortBy={sortBy}
                sortDescending={sortDescending}
                onSort={handleSort}
              />

              <Pagination
                pageNumber={productos.pageNumber}
                totalPages={productos.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </DataState>

      </header>

      <FiltersComponent filtersAreOpen={areFiltersOpen} />

      {isAddRecordFormOpen && (
        <FormProducto
          mod="add"
          formData={addProductoMutation.formData}
          handleChange={addProductoMutation.handleChange}
          handleSubmit={addProductoMutation.handleSubmit}
          fieldErrors={addProductoMutation.fieldErrors}
          submitError={addProductoMutation.submitError}
          onClose={handleCloseAddForm}
          disabled={addProductoMutation.isSubmitting}
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
            formData={updateProductoMutation.formData}
            handleChange={updateProductoMutation.handleChange}
            handleSubmit={updateProductoMutation.handleSubmit}
            fieldErrors={updateProductoMutation.fieldErrors}
            submitError={updateProductoMutation.submitError}
            onClose={handleCloseUpdateForm}
            disabled={updateProductoMutation.isSubmitting}
          />
        )}
    </div>
  );
};

export default ProductsManagementPage;