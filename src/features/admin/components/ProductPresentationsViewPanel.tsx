// src/features/admin/components/ProductPresentationsViewPanel.tsx

// Componentes.
import { ProductPresentationCard } from "@/features/admin/components/ProductPresentationCard";

// Types.
import type { ProductoPresentacionResponse } from "@/types/responses/ProductoPresentacionResponses";

type Layout = "compacto" | "normal" | "amplio";

const gridLayouts: Record<Layout, string> = {
    compacto: "grid-cols-4",
    normal: "grid-cols-2",
    amplio: "grid-cols-1",
};

interface ProductPresentationsViewPanelProps {
    items: ProductoPresentacionResponse[];
    titulo?: string;
    subtitulo?: string;
    isLoadingProductos?: boolean;
    editable: boolean;
    layout?: Layout;
    onEdit?: () => void;
}

export const ProductPresentationsViewPanel = ({
    items,
    titulo,
    subtitulo,
    editable = false,
    layout = "normal",
    onEdit,
}: ProductPresentationsViewPanelProps) => {
    return (
        <section className="flex h-full flex-col rounded-md border border-slate-200 bg-slate-50 p-4">
            <header className="space-y-1">
                <h2 className="text-sm font-semibold text-slate-900">
                    {titulo}
                </h2>

                <p className="text-xs text-slate-500">
                    {subtitulo}
                </p>
            </header>

            <div className="mt-2">
                {items.length === 0 ? (
                    <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">
                        No hay registros
                    </div>
                ) : (
                    <div className={`grid gap-4 ${gridLayouts[layout]}`}>
                        {items.map(pp => (
                            <ProductPresentationCard
                                key={pp.productoPresentacionId}
                                productoPresentacion={pp}
                                editable={editable}
                                onEdit={onEdit}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};