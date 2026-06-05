// src/features/admin/components/Pagination.tsx

import { useEffect, useState } from "react";

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export const Pagination = ({
  pageNumber,
  totalPages,
  onPageChange
}: PaginationProps) => {

  const [inputPage, setInputPage] = useState(pageNumber.toString());

  useEffect(() => {
    setInputPage(pageNumber.toString());
  }, [pageNumber]);

  const handleGoToPage = () => {
    const page = Number(inputPage);

    if (!Number.isInteger(page)) {
      return;
    }

    const validPage = Math.min(
      Math.max(page, 1),
      totalPages
    );

    onPageChange?.(validPage);
  };

  return (
    <nav className="flex items-center justify-between text-sm px-2">
      <span>
        Página {pageNumber} de {totalPages}
      </span>
      
      <div className="flex items-center gap-2">
        <button
          disabled={pageNumber === 1}
          onClick={() => onPageChange?.(pageNumber - 1)}
          className="rounded border px-3 py-1 disabled:opacity-50"
        >
          Anterior
        </button>

        <input
          type="text"
          inputMode="numeric"
          value={inputPage}
          onChange={(e) =>
            setInputPage(
              e.target.value.replace(/\D/g, "")
            )
          }
          className="w-12 rounded border px-2 py-1 text-center"
          aria-label="Ir a página"
        />

        <button
          onClick={handleGoToPage}
          className="rounded border px-3 py-1"
        >
          Ir
        </button>

        <button
          disabled={pageNumber === totalPages}
          onClick={() => onPageChange?.(pageNumber + 1)}
          className="rounded border px-3 py-1 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </nav>
  );
};