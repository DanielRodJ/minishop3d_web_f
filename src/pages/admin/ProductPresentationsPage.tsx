// src/pages/admin/ProductPresentationsPage.tsx

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/solid";

import { Spinner } from "@/components/ui/Spinner";
import { Toast } from "@/components/ui/Toast";
import type { SelectOption } from "@/components/shared/inputs/Dropdown";

import { FormProductPresentation } from "@/features/admin/components/FormsProductPresentation";
import {
} from "@/features/admin/hooks/useProductosForm";
import { getProductoAsync } from "@/features/admin/services/ApiProducto";
import {
  getEscalas,
  getEstadosProducto,
  getFilamentos
} from "@/services/ApiCatalogo";

import { getErrorMessage } from "@/errors/ApiError";
import type {
  ProductoDetalladoResponse,
} from "@/types/responses/ProductoResponses";
import type { UpdateProductoPresentacionCommand } from "@/types/ProductoPresentacionCommands";
import type { ProductoPresentacionResponse } from "@/types/responses/ProductoPresentacionResponses";
import { getInitialProductoPresentacion, useAddProductoPresentacionForm, useUpdateProductoPresentacionForm } from "@/features/admin/hooks/useProductPresentationForm";

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

  const [producto, setProducto] = useState<ProductoDetalladoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [isAddOpen, setAddOpen] = useState(false);
  const [selectedPresentation, setSelectedPresentation] =
    useState<ProductoPresentacionResponse | null>(null);

  const [escalaOptions, setEscalaOptions] = useState<SelectOption[]>([]);
  const [estadoOptions, setEstadoOptions] = useState<SelectOption[]>([]);
  const [filamentoOptions, setFilamentoOptions] = useState<SelectOption[]>([]);

  const loadProducto = useCallback(async () => {
    if (!parsedProductoId) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await getProductoAsync(parsedProductoId);
      setProducto(data);
    } catch (error) {
      setError(getErrorMessage(error, "Error al cargar producto"));
    } finally {
      setIsLoading(false);
    }
  }, [parsedProductoId]);

  useEffect(() => {
    loadProducto();
  }, [loadProducto]);

  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        const [escalas, estados, filamentos] = await Promise.allSettled([
          getEscalas(),
          getEstadosProducto(),
          getFilamentos()
        ]);

        if (escalas.status === "fulfilled") {
          setEscalaOptions(
            escalas.value.map(item => ({
              value: item.codigo,
              label: item.nombre
            }))
          );
        }

        if (estados.status === "fulfilled") {
          setEstadoOptions(
            estados.value.map(item => ({
              value: item.codigo,
              label: item.nombre
            }))
          );
        }

        if (filamentos.status === "fulfilled") {
          setFilamentoOptions(
            filamentos.value.map(item => ({
              value: item.filamentoId,
              label: `${item.display} - ${item.color}`
            }))
          );
        } else {
          setToast("No se pudieron cargar los filamentos. Revisa la ruta del endpoint.");
        }
      } catch (error) {
        setToast(getErrorMessage(error, "Error al cargar catalogos"));
      }
    };

    loadCatalogs();
  }, []);

  const addForm = useAddProductoPresentacionForm({
    productoId: parsedProductoId,
    onSuccess: async () => {
      setAddOpen(false);
      await loadProducto();
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
      await loadProducto();
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

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : error ? (
        <div className="p-4 text-center text-red-600">{error}</div>
      ) : presentations.length === 0 ? (
        <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Este producto aun no tiene presentaciones.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {presentations.map((presentation) => (
            <PresentationCard
              key={presentation.productoPresentacionId}
              presentation={presentation}
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
          handleCalculatePrice={() => { }}
          fieldErrors={updateForm.fieldErrors}
          submitError={updateForm.submitError}
          disabled={updateForm.isSubmitting}
          isCalculating={false}
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

type PresentationCardProps = {
  presentation: ProductoPresentacionResponse;
  onEdit: () => void;
};

const PresentationCard = ({ presentation, onEdit }: PresentationCardProps) => {
  const scaleLabel =
    presentation.escalaCodigo;
  const statusLabel =
    presentation.estadoProductoPresentacionCodigo;
  const filamentLabel =
    presentation.filamento?.display ?? `Filamento ${presentation.filamentoId}`;

  return (
    <article className="relative rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 h-28 rounded-md bg-slate-100" />
      <div className="space-y-1 text-sm">
        <h2 className="font-semibold text-slate-900">{scaleLabel}</h2>
        <p className="text-slate-500">{filamentLabel}</p>
        <p className="text-slate-600">
          {presentation.dimensionX} x {presentation.dimensionY} x {presentation.dimensionZ} mm
        </p>
        <p className="text-slate-600">
          {presentation.cantidadGramosFilamentoUso} g · {presentation.tiempoImpresionMinutos} min
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
            {statusLabel}
          </span>
          <span className="text-sm font-semibold text-slate-900">
            ${presentation.precioVenta}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-slate-700"
        aria-label="Editar presentación"
      >
        <PencilIcon className="h-4 w-4" />
      </button>
    </article>
  );
};

export default ProductPresentationsPage;
