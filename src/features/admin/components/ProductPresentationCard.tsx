// src/features/admin/components/ProductPresentationCard.tsx

import { PencilIcon } from "@heroicons/react/24/solid";

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
            <div className="mb-3 h-28 rounded-md bg-slate-100" />
            <div className="space-y-3">
                <div>
                    <h3 className="font-semibold text-slate-900">
                        {filamentoLabel}
                    </h3>
                    <p className="text-sm text-slate-500">
                        Escala {productoPresentacion.escalaCodigo}
                    </p>
                </div>
                <dl className="space-y-1 text-sm">
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
                <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
                        {estadoProductoLabel}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">
                            ${productoPresentacion.precioVenta}
                        </span>
                        {editable && onEdit && (
                            <button
                                type="button"
                                onClick={onEdit}
                                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black text-white hover:bg-slate-700"
                                aria-label="Editar presentación"
                            >
                                <PencilIcon className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};