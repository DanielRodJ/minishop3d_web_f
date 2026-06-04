// src/pages/admin/ProductPresentationsPage.tsx

// Librerías externas.
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

// Componentes.
import { Spinner } from "@/components/ui/Spinner";
import { Toast } from "@/components/ui/Toast";

import { FormProductPresentation } from "@/features/admin/components/FormsProductPresentation";
import { ProductPresentationCard } from "@/features/admin/components/ProductPresentationCard";

// Hooks.
import { useProducto } from "@/features/admin/hooks/productos/useProducto";
import {
  getInitialProductoPresentacion,
  useAddProductoPresentacionForm,
  useUpdateProductoPresentacionForm
} from "@/features/admin/hooks/useProductPresentationForm";

// Servicios.
import {
  getEscalas,
  getEstadosProducto,
  getFilamentos
} from "@/services/ApiCatalogo";

// Utils.
import { getErrorMessage } from "@/errors/ApiError";

// Types.
import type { SelectOption } from "@/components/shared/inputs/Dropdown";
import type { UpdateProductoPresentacionCommand } from "@/types/ProductoPresentacionCommands";
import type { ProductoPresentacionResponse } from "@/types/responses/ProductoPresentacionResponses";

const EMPTY_UPDATE_PRESENTACION: UpdateProductoPresentacionCommand = {
  productoPresentacionId: 0,
  ...getInitialProductoPresentacion(0)
};

const mapPresentationToCommand = (
  presentation: ProductoPresentacionResponse
): UpdateProductoPresentacionCommand => ({
  productoPresentacionId: presentation.productoPresentacionId,
  productoId: presentation.productoId,
  filamentoId: presentation.filamentoId,
  escalaCodigo: presentation.escalaCodigo,
  dimensionX: presentation.dimensionX,
  dimensionY: presentation.dimensionY,
  dimensionZ: presentation.dimensionZ,
  tiempoImpresionMinutos: presentation.tiempoImpresionMinutos,
  cantidadGramosFilamentoUso: presentation.cantidadGramosFilamentoUso,
  estadoProductoPresentacionCodigo: presentation.estadoProductoPresentacionCodigo,
  stock: presentation.stock,
  costoProduccionAdicional: presentation.costoProduccionAdicional,
  precioVenta: presentation.precioVenta
});

export const ProductPresentationsPage = () => {

  const { productoId } = useParams();
  const navigate = useNavigate();
  const parsedProductoId = Number(productoId);

  const [toast, setToast] = useState<string | null>(null);

  const [isAddOpen, setAddOpen] = useState(false);
  const [selectedPresentation, setSelectedPresentation] =
    useState<ProductoPresentacionResponse | null>(null);

  const {
    producto,
    isLoadingProducto,
    productoError,
    refetchProducto
  } = useProducto(parsedProductoId);

  const escalasQuery = useQuery({
    queryKey: ["catalogo", "escalas"],
    queryFn: getEscalas,
    staleTime: 5 * 60 * 1000,
  });

  const estadosQuery = useQuery({
    queryKey: ["catalogo", "estados-producto"],
    queryFn: getEstadosProducto,
    staleTime: 5 * 60 * 1000,
  });

  const filamentosQuery = useQuery({
    queryKey: ["catalogo", "filamentos"],
    queryFn: getFilamentos,
    staleTime: 5 * 60 * 1000,
  });

  const escalaOptions = useMemo<SelectOption[]>(() => {
    return escalasQuery.data?.map(item => ({
      value: item.codigo,
      label: item.nombre
    })) ?? [];
  }, [escalasQuery.data]);

  const estadoOptions = useMemo<SelectOption[]>(() => {
    return estadosQuery.data?.map(item => ({
      value: item.codigo,
      label: item.nombre
    })) ?? [];
  }, [estadosQuery.data]);

  const filamentoOptions = useMemo<SelectOption[]>(() => {
    return filamentosQuery.data?.map(item => ({
      value: item.filamentoId,
      label: `${item.display} - ${item.color}`
    })) ?? [];
  }, [filamentosQuery.data]);

  useEffect(() => {
    if (filamentosQuery.error) {
      setToast(getErrorMessage(filamentosQuery.error, "Error al cargar filamentos"));
      return;
    }

    if (escalasQuery.error || estadosQuery.error) {
      setToast(
        getErrorMessage(escalasQuery.error ?? estadosQuery.error!, "Error al cargar catalogos")
      );
    }
  }, [escalasQuery.error, estadosQuery.error, filamentosQuery.error]);

  const addForm = useAddProductoPresentacionForm({
    productoId: parsedProductoId,
    onSuccess: async () => {
      setAddOpen(false);
      await refetchProducto();
    }
  });

  const updateInitialData = useMemo(() => {
    if (!selectedPresentation) return EMPTY_UPDATE_PRESENTACION;
    return mapPresentationToCommand(selectedPresentation);
  }, [selectedPresentation]);

  const updateForm = useUpdateProductoPresentacionForm({
    initialData: updateInitialData,
    onSuccess: async () => {
      setSelectedPresentation(null);
      await refetchProducto();
    }
  });

  const presentations = producto?.productoPresentaciones ?? [];

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
            {producto?.nombreProducto ?? "Producto"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#612D53] text-white hover:bg-[#4e2342] cursor-pointer"
          aria-label="Añadir presentación"
          title="Añadir presentación"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      {isLoadingProducto ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : productoError ? (
        <div className="p-4 text-center text-red-600">{productoError}</div>
      ) : presentations.length === 0 ? (
        <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Este producto aun no tiene presentaciones.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {presentations.map((presentation) => (
            <ProductPresentationCard
              key={presentation.productoPresentacionId}
              productoPresentacion={presentation}
              editable={true}
              onEdit={() => setSelectedPresentation(presentation)}
            />
          ))}
        </div>
      )}

      {isAddOpen && (
        <FormProductPresentation
          formData={addForm.formData}
          escalaOptions={escalaOptions}
          estadoOptions={estadoOptions}
          filamentoOptions={filamentoOptions}
          handleChange={addForm.handleChange}
          handleSelectChange={addForm.handleSelectChange}
          handleSubmit={addForm.handleSubmit}
          handleCalculatePrice={addForm.handleCalculatePrice}
          fieldErrors={addForm.fieldErrors}
          submitError={addForm.submitError}
          disabled={addForm.isSubmitting}
          isCalculating={addForm.isCalculating}
          onClose={() => setAddOpen(false)}
        />
      )}

      {selectedPresentation && (
        <FormProductPresentation
          formData={updateForm.formData}
          escalaOptions={escalaOptions}
          estadoOptions={estadoOptions}
          filamentoOptions={filamentoOptions}
          handleChange={updateForm.handleChange}
          handleSelectChange={updateForm.handleSelectChange}
          handleSubmit={updateForm.handleSubmit}
          handleCalculatePrice={updateForm.handleCalculatePrice}
          fieldErrors={updateForm.fieldErrors}
          submitError={updateForm.submitError}
          disabled={updateForm.isSubmitting}
          isCalculating={updateForm.isCalculating}
          onClose={() => setSelectedPresentation(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast message={toast} onClose={() => setToast(null)} />
        </div>
      )}
    </section>
  );
};

export default ProductPresentationsPage;