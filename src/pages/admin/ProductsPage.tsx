import { FiltersComponent } from "../../features/admin/components/FiltersComponent";
import { SearchBarTable } from "../../components/shared/SearchBarComponents";
import { ButtonCustom } from "../../components/ui/Buttons";
import { Table, type Column } from "../../features/admin/components/TableTemplate";
import { useState } from "react";
import { FormProducto } from "../../features/admin/components/FormsProduct";
import type { ProductoBaseDto } from "./../../types/responses/ProductResponses";
import type { ProductoResponse } from "../../types/responses/ProductResponses";
import type { UpdateProductoCommand } from "../../types/ProductCommand";
import { useProductos } from "../../features/admin/hooks/useProductos";
import {
  useAddProductoForm,
  useUpdateProductoForm
} from "../../features/admin/hooks/useProductosForm";
import { useMemo } from "react";

export const ProductosPage = () => {

  /* =========================================================
   Table
  ========================================================= */

  const columns = [
    { header: "ID", key: "productoId" },
    { header: "Nombre", key: "nombre" },
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
          <ButtonCustom preset="tableDelete" />
        </div>
      )
    }
  ] satisfies Column<ProductoBaseDto>[];

  /* =========================================================
   State
  ========================================================= */

  const [areFiltersOpen, setFiltersOpen] = useState(false);
  const [isAddRecordFormOpen, setAddRecordFormOpen] = useState(false);
  const [isModifyRecordFormOpen, setModifyRecordFormOpen] = useState(false);

  const [selectedProductoId, setSelectedProductoId] = useState<number | null>(null);

  /* =========================================================
   Data hook
  ========================================================= */

  const {
    productos,
    producto,
    page,
    setPage,
    search,
    setSearch,
    refetch,
    refetchProducto
  } = useProductos();

  /* =========================================================
     🔹 Mapper DTO → Command
  ========================================================= */

  const mapProductoToCommand = (
    p: ProductoResponse
  ): UpdateProductoCommand => ({
    productoId: p.productoId,
    nombreProducto: p.nombre,
    descripcionProducto: "2",
    escalaBase: "2",
    costoProduccionBase: 2,
    filamentoUsoBase: 2,
    autorNombre: p.autorNombre ?? undefined,
    fechaLanzamiento: p.fechaLanzamiento,
    coleccionId: p.coleccionId ?? undefined
  });

  /* =========================================================
     🔹 Forms (hooks)
  ========================================================= */

  const addForm = useAddProductoForm({
    onSuccess: async () => {
      handleClose();
      await refetch();
    }
  });

  const emptyUpdate: UpdateProductoCommand = {
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

  const updateInitialData = useMemo(() => {
    if (!producto) return emptyUpdate;
    return mapProductoToCommand(producto);
  }, [producto]);

  const updateForm = useUpdateProductoForm({
    initialData: updateInitialData as UpdateProductoCommand,
    onSuccess: async () => {
      handleClose();
      await refetch();
    }
  });

  /* =========================================================
     🔹 Handlers
  ========================================================= */

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

  const handleOpenModifyRecordForm = async (id: number) => {
    setSelectedProductoId(id);
    await refetchProducto(id);
    setModifyRecordFormOpen(true);
  };

  /* =========================================================
     🔹 Render
  ========================================================= */

  return (
    <div className="flex relative">
      <header className="bg-white p-2 border border-slate-200 rounded-md w-full">
        <h1 className="text-lg font-bold text-black">
          Productos Registrados.
        </h1>

        <div className="flex gap-1.5 justify-end my-4">
          <div className="flex-1">
            <SearchBarTable />
          </div>

          <ButtonCustom preset="addRecord" onClick={handleOpenAddRecordForm} />
          <ButtonCustom preset="generateDocument" />
          <ButtonCustom preset="filters" onClick={handleFilters} />
        </div>

        {productos ? (
          <Table
            columns={columns}
            data={productos}
            onPageChange={setPage}
          />
        ) : (
          <div className="p-4 text-center">Cargando...</div>
        )}
      </header>

      <FiltersComponent filtersAreOpen={areFiltersOpen} />

      {/* 🟢 ADD */}
      {isAddRecordFormOpen && (
        <FormProducto
          mod="add"
          formData={addForm.formData}
          handleChange={addForm.handleChange}
          handleSubmit={addForm.handleSubmit}
          onClose={handleClose}
        />
      )}

      {/* 🔵 UPDATE */}
      {isModifyRecordFormOpen && producto && (
        <FormProducto
          mod="update"
          formData={updateForm.formData}
          handleChange={updateForm.handleChange}
          handleSubmit={updateForm.handleSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ProductosPage;