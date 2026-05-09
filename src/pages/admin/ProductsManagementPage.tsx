// src/pages/admin/ProductsManagementPage.tsx

import { useCallback, useMemo, useState } from "react";

import { SearchBarCustom } from "@/components/shared/SearchBarComponents";
import { ButtonCustom } from "@/components/ui/Buttons";

import { FiltersComponent } from "@/features/admin/components/FiltersComponent";
import { FormProducto } from "@/features/admin/components/FormsProduct";
import { Table, type Column } from "@/features/admin/components/TableTemplate";

import { useProductos } from "@/features/admin/hooks/useProductos";
import {
  useAddProductoForm,
  useUpdateProductoForm
} from "@/features/admin/hooks/useProductosForm";

import type { UpdateProductoCommand } from "@/types/ProductCommand";
import type {
  ProductoBaseDto,
  ProductoDetalladoResponse
} from "@/types/responses/ProductResponses";

import { Toast } from "@/components/ui/Toast";
import { Spinner } from "@/components/ui/Spinner";

const EMPTY_UPDATE: UpdateProductoCommand = {
  productoId: 0,
  nombreProducto: "",
  descripcionProducto: "",
  escalaBase: "",
  costoProduccionBase: 0,
  filamentoUsoBase: 0,
  autorNombre: undefined,
  fechaLanzamiento: "",
  coleccionId: undefined
};

const mapProductoToCommand = (
  p: ProductoDetalladoResponse
): UpdateProductoCommand => ({
  productoId: p.productoId,
  nombreProducto: p.nombreProducto,
  descripcionProducto: p.descripcionProducto,
  escalaBase: p.escalaBase,
  costoProduccionBase: p.costoProduccionBase,
  filamentoUsoBase: p.filamentoUsoBase,
  autorNombre: p.autorNombre ?? undefined,
  fechaLanzamiento: p.fechaLanzamiento,
  coleccionId: p.coleccionId ?? undefined
});

export const ProductsManagementPage = () => {

  const columnsTable = [
    { header: "ID", key: "productoId" },
    { header: "Nombre", key: "nombreProducto" },
    {
      header: "Colección",
      render: (p: ProductoBaseDto) => p.coleccion?.nombre ?? "—"
    },
    { header: "Autor", key: "autorNombre" },
    {
      header: "Fecha",
      render: (p: ProductoBaseDto) =>
        new Date(p.fechaLanzamiento).toLocaleDateString()
    },
    {
      header: "Opciones",
      render: (p: ProductoBaseDto) => (
        <div className="flex gap-1.5">
          <ButtonCustom preset="tableModify"
            onClick={() => handleOpenModifyRecordForm(p.productoId)}
          />
          <ButtonCustom preset="tableInfo" aria-label="Ver detalles del producto" />
        </div>
      )
    }
  ] satisfies Column<ProductoBaseDto>[];

  const [areFiltersOpen, setFiltersOpen] = useState(false);
  const [isAddRecordFormOpen, setAddRecordFormOpen] = useState(false);
  const [isModifyRecordFormOpen, setModifyRecordFormOpen] = useState(false);

  const [selectedProductoId, setSelectedProductoId] = useState<number | null>(null);

  const {
    productos,
    producto,
    isLoading,
    isLoadingProducto,
    error,
    productoError,
    clearProductoError,
    setPage,
    setSearch,
    refetch,
    refetchProducto
  } = useProductos();

  const addForm = useAddProductoForm({
    onSuccess: async () => {
      handleClose();
      await refetch();
    }
  });

  const updateInitialData = useMemo(() => {
    if (!producto) return EMPTY_UPDATE;
    return mapProductoToCommand(producto);
  }, [producto]);

  const updateForm = useUpdateProductoForm({
    initialData: updateInitialData as UpdateProductoCommand,
    onSuccess: async () => {
      handleClose();
      await refetch();
    }
  });

  const handleFilters = () => {
    setFiltersOpen(prev => !prev);
  };

  const handleOpenAddRecordForm = () => {
    setAddRecordFormOpen(true);
  };

  const handleClose = () => {
    setAddRecordFormOpen(false);
    setModifyRecordFormOpen(false);
  };

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, [setPage, setSearch]);

  const handleOpenModifyRecordForm = async (id: number) => {

    setSelectedProductoId(id);
    setModifyRecordFormOpen(true);

    if (!producto || producto.productoId !== id) {
      await refetchProducto(id);
    }
  };

  return (
    <div className="flex relative">
      <header className="bg-white p-2 border border-slate-200 rounded-md w-full">
        <h1 className="text-lg font-bold text-black">
          Productos Registrados.
        </h1>

        <div className="flex flex-wrap gap-2 items-center justify-end my-4">
          <div className="flex-1">
            <SearchBarCustom
              preset="searchBarTable"
              onSearch={handleSearch}
            />
          </div>

          <ButtonCustom preset="addRecord" onClick={handleOpenAddRecordForm} />
          <ButtonCustom preset="generateDocument" />
          <ButtonCustom preset="filters" onClick={handleFilters} />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : error ? (
          <div className="p-4 text-center">{error}</div>
        ) : productos && productos.items.length > 0 ? (
          <Table
            columns={columnsTable}
            data={productos}
            onPageChange={setPage}
            getRowId={(p) => p.productoId}
          />
        ) : productos && productos.items.length === 0 ? (
          <div className="p-4 text-center">No hay productos registrados</div>
        ) : null}
      </header>

      <FiltersComponent filtersAreOpen={areFiltersOpen} />

      {isAddRecordFormOpen && (
        <FormProducto
          mod="add"
          formData={addForm.formData}
          handleChange={addForm.handleChange}
          handleSubmit={addForm.handleSubmit}
          fieldErrors={addForm.fieldErrors}
          submitError={addForm.submitError}
          onClose={handleClose}
          disabled={addForm.isSubmitting}
        />
      )}

      {isModifyRecordFormOpen && isLoadingProducto && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}

      {productoError && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast
            message={productoError}
            onClose={() => clearProductoError()}
          />
        </div>
      )}

      {isModifyRecordFormOpen && producto && producto.productoId === selectedProductoId && (
        <FormProducto
          key={producto.productoId}
          mod="update"
          formData={updateForm.formData}
          handleChange={updateForm.handleChange}
          handleSubmit={updateForm.handleSubmit}
          fieldErrors={updateForm.fieldErrors}
          submitError={updateForm.submitError}
          onClose={handleClose}
          disabled={updateForm.isSubmitting}
        />
      )}
    </div>
  );
};

export default ProductsManagementPage;
