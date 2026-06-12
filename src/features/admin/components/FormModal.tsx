// src/features/admin/components/FormModal.tsx

import type { ReactNode } from "react";

import { ErrorMessage } from "@/components/shared/feedback/ErrorMessage";

type FormModalProps = {
    tituloModal: string;
    textoEnvio: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    disabled?: boolean;
    submitError?: string | null;
    children: ReactNode;
};

export const FormModal = ({
    tituloModal,
    textoEnvio,
    isOpen,
    onClose,
    onSubmit,
    submitError,
    children,
    disabled = false,
}: FormModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-white w-full max-w-3xl rounded-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={disabled}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black disabled:opacity-50 cursor-pointer"
                    aria-label="Cerrar formulario"
                >
                    x
                </button>

                <h2 className="text-xl font-semibold text-gray-800">
                    {tituloModal}
                </h2>

                <hr className="border-t border-gray-200 my-4" />

                <form onSubmit={onSubmit} autoComplete="off" noValidate className="space-y-5">
                    {submitError && (
                        <div className="rounded-md border border-red-200 bg-red-50 p-3">
                            <ErrorMessage message={submitError} />
                        </div>
                    )}

                    {children}

                    <div className="pt-4 border-t border-gray-200 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={disabled}
                            className="px-4 py-2 text-gray-600 hover:text-black disabled:opacity-50 cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={disabled}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
                        >
                            {disabled ? "Guardando..." : textoEnvio}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
