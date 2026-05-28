// src/features/admin/components/ProductPresentationCard.tsx

import type { ProductoPresentacionResponse } from "@/types/responses/ProductoPresentacionResponses";

interface ProductPresentationCardProps {
    productoPresentacion: ProductoPresentacionResponse;
}

const formatMedidas = ({ escalaCodigo, dimensionX, dimensionY, dimensionZ }: ProductoPresentacionResponse) =>
    `${escalaCodigo}: ${dimensionX} x ${dimensionY} x ${dimensionZ} mm`;

export const ProductPresentationCard = ({ productoPresentacion }: ProductPresentationCardProps) => {
    return (
        <div className="bg-black rounded-md p-4 text-sm text-white m-2">
            <h3 className="text-lg font-semibold">
                {productoPresentacion.filamento?.display ?? productoPresentacion.filamentoId}
            </h3>
            <ul className="text-xs text-slate-300">
                <li>Medidas: {formatMedidas(productoPresentacion)}</li>
                <li>Tiempo de impresión: {productoPresentacion.tiempoImpresionMinutos} min</li>
                <li>Gramos usados: {productoPresentacion.cantidadGramosFilamentoUso} g</li>
                <li>Costo adicional: ${productoPresentacion.costoProduccionAdicional}</li>
                <li>Precio de venta: ${productoPresentacion.precioVenta}</li>
            </ul>
        </div>
    );
}