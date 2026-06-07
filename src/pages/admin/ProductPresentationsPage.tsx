// src/pages/admin/ProductPresentationsPage.tsx

// Librerías externas.
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

// Componentes.
import { FormProductPresentation } from "@/features/admin/components/FormsProductPresentation";

// Hooks.
import {
  getInitialProductoPresentacion,
  useAddProductoPresentacionMutation,
  useUpdateProductoPresentacionMutation
} from "@/features/admin/hooks/productos/useProductoPresentacionMutations";
import { useCatalogos } from "@/features/admin/hooks/catalogos/useCatalogos";
import { useProductoPresentaciones } from "@/features/admin/hooks/productos/useProductoPresentaciones";

// Types.
import type { UpdateProductoPresentacionCommand } from "@/types/commands/ProductoPresentacionCommands";
import type { ProductoPresentacionResponse } from "@/types/responses/ProductoPresentacionResponses";
import { ProductPresentationsViewPanel } from "@/features/admin/components/ProductPresentationsViewPanel";

import { Pagination } from "@/features/admin/components/Pagination";
import { DataState } from "@/features/admin/DataState";
import { mapToSelectOptions } from "@/features/admin/utils/mapToSelectOptions";

// método para mapear response a command.
// preparación de datos para mostrar en formulario.
const mapProductoPresentacionToCommand = (
  pp: ProductoPresentacionResponse
): UpdateProductoPresentacionCommand => ({
  productoPresentacionId: pp.productoPresentacionId,
  productoId: pp.productoId,
  filamentoId: pp.filamentoId,
  escalaCodigo: pp.escalaCodigo,
  dimensionX: pp.dimensionX,
  dimensionY: pp.dimensionY,
  dimensionZ: pp.dimensionZ,
  tiempoImpresionMinutos: pp.tiempoImpresionMinutos,
  cantidadGramosFilamentoUso: pp.cantidadGramosFilamentoUso,
  estadoProductoPresentacionCodigo: pp.estadoProductoPresentacionCodigo,
  stock: pp.stock,
  costoProduccionAdicional: pp.costoProduccionAdicional,
  precioVenta: pp.precioVenta
});

// valor inicial para mantener tipado y estado controlado del formulario.
const EMPTY_UPDATE_PRESENTACION: UpdateProductoPresentacionCommand = {
  productoPresentacionId: 0,
  ...getInitialProductoPresentacion(0)
};

export const ProductPresentationsPage = () => {
  const navigate = useNavigate();

  const [isAddRecordFormOpen, setAddRecordFormOpen] = useState(false);
  const [selectedPresentation, setSelectedPresentation] = useState<ProductoPresentacionResponse | null>(null);

  const { productoId } = useParams();
  const productoIdNumber = Number(productoId);

  const {
    productoPresentaciones,
    isLoadingProductoPresentaciones,
    productoPresentacionesError,
    setPage,
  } = useProductoPresentaciones(productoIdNumber);

  const {
    escalas,
    estadosProducto,
    filamentos,
  } = useCatalogos();

  // mapeo de opcioens para dropdowns.
  const escalasOpciones = useMemo(
    () => mapToSelectOptions(
      escalas ?? [],
      escala => escala.codigo,
      escala => escala.nombre
    ), [escalas]
  );

  const estadosOpciones = useMemo(
    () => mapToSelectOptions(
      estadosProducto ?? [],
      estadoProducto => estadoProducto.codigo,
      estadoProducto => estadoProducto.nombre
    ), [estadosProducto]
  );

  const filamentosOpciones = useMemo(
    () => mapToSelectOptions(
      filamentos ?? [],
      filamento => filamento.codigo,
      filamento => filamento.display,
    ), [filamentos]
  );

  // valores vaciós iniciales del formulario de actualización.
  const updateInitialData = useMemo(
    () => {
      if (!selectedPresentation) return EMPTY_UPDATE_PRESENTACION;
      return mapProductoPresentacionToCommand(selectedPresentation);
    }, [selectedPresentation]
  );

  const addProductoPresentacionMutation = useAddProductoPresentacionMutation({
    // envío de id para llenado de campo productoId.
    productoId: productoIdNumber,
    // si la operación es exisota:
    // cerrar la vetanan de addRecordForm
    onSuccess: () => {
      setAddRecordFormOpen(false);
    }
  });

  const updateProductoPresentacionMutation = useUpdateProductoPresentacionMutation({
    // envío de datos iniciales para updateProductoPresentacionMutation
    initialData: updateInitialData,
    // si la operación es exitosa:
    // cambiamos selectedPresentation a null para cerrar la ventana de updateRecordForm.
    onSuccess: () => {
      setSelectedPresentation(null);
    }
  });

  return (
    <section className="min-h-full bg-white p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="mb-2 text-sm text-slate-500 hover:text-black cursor-pointer"
          >
            Volver a productos
          </button>
          <h1 className="text-xl font-bold text-slate-900">
            Presentaciones
          </h1>
          <p className="text-sm text-slate-500">
            Configuración escalas, materiales, stock y precios para cada presentación.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddRecordFormOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#612D53] text-white hover:bg-[#4e2342] cursor-pointer"
          aria-label="Añadir presentación"
          title="Añadir presentación"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>


      <DataState
        isLoading={isLoadingProductoPresentaciones}
        error={productoPresentacionesError}
      >
        {productoPresentaciones && (
          <div className="space-y-3">
            <ProductPresentationsViewPanel
              items={productoPresentaciones.items}
              editable={true}
              titulo="Presentaciones registradas"
              subtitulo={`${productoPresentaciones.totalItems} variantes disponibles`}
              onEdit={() => console.log("hola")}
              layout="compacto"
            />
            <Pagination
              pageNumber={productoPresentaciones.pageNumber}
              totalPages={productoPresentaciones.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </DataState>

      {isAddRecordFormOpen && (
        <FormProductPresentation
          formData={addProductoPresentacionMutation.formData}
          escalaOptions={escalasOpciones}
          estadoOptions={estadosOpciones}
          filamentoOptions={filamentosOpciones}
          handleChange={addProductoPresentacionMutation.handleChange}
          handleSelectChange={addProductoPresentacionMutation.handleSelectChange}
          handleSubmit={addProductoPresentacionMutation.handleSubmit}
          handleCalculatePrice={addProductoPresentacionMutation.handleCalculatePrice}
          fieldErrors={addProductoPresentacionMutation.fieldErrors}
          submitError={addProductoPresentacionMutation.submitError}
          disabled={addProductoPresentacionMutation.isSubmitting}
          isCalculating={addProductoPresentacionMutation.isCalculating}
          onClose={() => setAddRecordFormOpen(false)}
        />
      )}

      {selectedPresentation && (
        <FormProductPresentation
          formData={updateProductoPresentacionMutation.formData}
          escalaOptions={escalasOpciones}
          estadoOptions={estadosOpciones}
          filamentoOptions={filamentosOpciones}
          handleChange={updateProductoPresentacionMutation.handleChange}
          handleSelectChange={updateProductoPresentacionMutation.handleSelectChange}
          handleSubmit={updateProductoPresentacionMutation.handleSubmit}
          handleCalculatePrice={updateProductoPresentacionMutation.handleCalculatePrice}
          fieldErrors={updateProductoPresentacionMutation.fieldErrors}
          submitError={updateProductoPresentacionMutation.submitError}
          disabled={updateProductoPresentacionMutation.isSubmitting}
          isCalculating={updateProductoPresentacionMutation.isCalculating}
          onClose={() => setSelectedPresentation(null)}
        />
      )}
    </section>
  );
};

export default ProductPresentationsPage;