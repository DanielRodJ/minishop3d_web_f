import { Spinner } from "@/components/ui/Spinner";
import type { ProductoPresentacionResponse } from "@/types/responses/ProductoPresentacionResponses";
import { ProductPresentationCard } from "./ProductPresentationCard";

interface ProductPresentationsViewPanelProps {
    data: {
        items: ProductoPresentacionResponse[];
        totalItems: number;
        pageNumber: number;
        pageSize: number;
        totalPages: number;
    } | null;

    headerText?: string;
    isLoadingProductos?: boolean;
    onPageChange?: (page: number) => void;
}

export const ProductPresentationsViewPanel = ({
    data,
    headerText,
    isLoadingProductos,
    onPageChange
}: ProductPresentationsViewPanelProps) => {

    const items = data?.items ?? [];
    const totalPages = data?.totalPages ?? 0;
    const pageNumber = data?.pageNumber ?? 1;

    return (
        <section className="flex h-full flex-col rounded-md border border-slate-200 bg-slate-50 p-4">
            <header className="space-y-1">
                <h2 className="text-sm font-semibold text-slate-900">
                    Presentaciones disponibles:
                </h2>

                <p className="text-xs text-slate-500">
                    {headerText}
                </p>
            </header>

            <div className="mt-2">
                {isLoadingProductos ? (
                    <div className="flex justify-center py-10">
                        <Spinner />
                    </div>
                ) : data === null ? (
                    <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">
                        No hay productos con presentaciones válidas por publicar
                    </div>
                ) : items.length === 0 ? (
                    <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">
                        No hay presentaciones disponibles para este producto
                    </div>
                ) : (
                    <div className="grid grid-cols-1">
                        {items.map(pp => (
                            <ProductPresentationCard
                                key={pp.productoPresentacionId}
                                productoPresentacion={pp}
                            />
                        ))}
                    </div>
                )}
            </div>

            {data && (
                <footer className="mt-auto space-y-2 pt-4">
                    <div className="flex flex-wrap items-center justify-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => onPageChange?.(page)}
                                className={`flex size-8 cursor-pointer items-center justify-center rounded-md text-xs font-semibold transition-all duration-200
                                    ${pageNumber === page
                                        ? "bg-zinc-900 text-white"
                                        : "bg-white text-zinc-900 hover:bg-zinc-100"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <p className="text-center text-xs text-slate-500">
                        Las presentaciones mostradas aquí formarán parte de las variantes disponibles para compra.
                    </p>
                </footer>
            )}
        </section>
    );
};