import { FiltersComponent } from "../../features/admin/components/FiltersComponent";
import { SearchBarTable } from "../../components/shared/SearchBarComponents";
import {
  ButtonAddRecord,
  ButtonGenerateDocument,
  ButtonFilters
} from "../../components/ui/Buttons";
import { Table, type Column } from "../../features/admin/components/TableTemplate";
import { useState } from "react";
import FormAddRecord from "../../features/admin/components/FormsProduct";
import type { ProductoBaseDto } from "./../../types/responses/ProductResponses";
import { useProductos } from "../../features/admin/hooks/useProductos";
import { useProductosForm } from "../../features/admin/hooks/useProductosForm";

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
  }
] satisfies Column<ProductoBaseDto>[];

export const ProductosPage = () => {
  const [areFiltersOpen, setFiltersOpen] = useState(false);
  const [isAddRecordFormOpen, setAddRecordFormOpen] = useState(false);

  const {
    productos,
    page,
    setPage,
    search,
    setSearch,
    refetch
  } = useProductos();

  const onClose = () => {
    setAddRecordFormOpen(false);
  };

  const { formData, handleChange, handleSubmit} = useProductosForm({
    onSuccess: async () => {
      onClose();
      await refetch();
    }
  });

  const handleFilters = () => {
    setFiltersOpen(prev => !prev);
  };

  const handleOpenAddRecordForm = () => {
    setAddRecordFormOpen(true);
  };

  return (
    <div className="flex relative">
      <header className="bg-white p-2 border border-slate-200 rounded-md w-full">
        <h1 className="text-lg font-bold text-black">
          Productos Registrados.
        </h1>

        <div className="flex gap-1.5 justify-end my-4">
          <div className="flex-1">
            <SearchBarTable
            />
          </div>

          <ButtonAddRecord onClick={handleOpenAddRecordForm} />
          <ButtonGenerateDocument />
          <ButtonFilters onClick={handleFilters} />
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

      {isAddRecordFormOpen && (
        <FormAddRecord
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default ProductosPage;