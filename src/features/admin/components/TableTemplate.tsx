export interface Column<T> {
  header: string;
  key?: keyof T;
  render?: (dato: T) => React.ReactNode;
}

interface TablaProps<T> {
  columns: Column<T>[];
  data: {
    items: T[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  getRowId: (fila: T) => React.Key;
}

export function Table<T>({
  columns,
  data,
  onPageChange,
  getRowId
}: TablaProps<T>) {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-center font-bold text-gray-900 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {data.items.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No hay registros
                </td>
              </tr>
            ) : (
              data.items.map((fila) => (
                <tr key={getRowId(fila)} className="hover:bg-gray-50">
                  {columns.map((col, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="flex justify-center">
                        {col.render
                          ? col.render(fila)
                          : col.key
                            ? (fila[col.key] as any)
                            : null}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center text-sm">
        <span>
          Página {data.pageNumber} de {data.totalPages}
        </span>

        <div className="space-x-2">
          <button
            disabled={data.pageNumber === 1}
            onClick={() => onPageChange?.(data.pageNumber - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <button
            disabled={data.pageNumber === data.totalPages}
            onClick={() => onPageChange?.(data.pageNumber + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}