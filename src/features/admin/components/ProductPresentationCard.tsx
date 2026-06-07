// src/features/admin/components/ProductPresentationCard.tsx

// Librerías externas.
import { PencilIcon } from "@heroicons/react/24/solid";

// Types.
import type { ProductoPresentacionResponse } from "@/types/responses/ProductoPresentacionResponses";

type ProductPresentationCardProps = {
    productoPresentacion: ProductoPresentacionResponse;
    editable?: boolean;
    onEdit?: () => void;
};

export const ProductPresentationCard = ({
    productoPresentacion,
    editable = false,
    onEdit
}: ProductPresentationCardProps) => {

    const filamentoLabel =
        productoPresentacion.filamento?.display ??
        `Filamento ${productoPresentacion.filamentoId}`;

    const estadoProductoLabel =
        productoPresentacion.estadoProductoPresentacionCodigo;

    return (
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                    {filamentoLabel}
                </span>

                <span className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-[#612D53]">
                    {productoPresentacion.escalaCodigo}
                </span>
            </div>

            <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">
                        Medidas
                    </dt>

                    <dd className="text-right text-slate-900">
                        {productoPresentacion.dimensionX}
                        {" x "}
                        {productoPresentacion.dimensionY}
                        {" x "}
                        {productoPresentacion.dimensionZ}
                        {" mm"}
                    </dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">
                        Tiempo
                    </dt>

                    <dd className="text-right text-slate-900">
                        {productoPresentacion.tiempoImpresionMinutos} min
                    </dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">
                        Filamento
                    </dt>

                    <dd className="text-right text-slate-900">
                        {productoPresentacion.cantidadGramosFilamentoUso} g
                    </dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">
                        Stock
                    </dt>

                    <dd className="text-right text-slate-900">
                        {productoPresentacion.stock}
                    </dd>
                </div>
            </dl>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
                    {estadoProductoLabel}
                </span>

                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-slate-900">
                        ${productoPresentacion.precioVenta}
                    </span>

                    {editable && onEdit && (
                        <button
                            type="button"
                            onClick={onEdit}
                            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-slate-900 text-white hover:bg-slate-700"
                        >
                            <PencilIcon className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
};