// src/features/admin/components/TableTemplate.tsx

import {
  ArrowsUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from "@heroicons/react/24/solid";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  sortKey?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowId: (row: T) => React.Key;

  sortBy?: string;
  sortDescending?: boolean;

  onSort?: (sortKey: string) => void;
}

export function Table<T>({
  columns,
  data,
  getRowId,
  sortBy,
  sortDescending,
  onSort
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-4 py-2.5 text-center font-bold text-gray-900 tracking-wider"
              >
                {column.sortKey ? (
                  <button
                    type="button"
                    onClick={() => onSort?.(column.sortKey!)}
                    className="inline-flex items-center gap-1"
                  >
                    {column.header}
                    <span className="cursor-pointer">
                      {sortBy === column.sortKey ? (
                        sortDescending ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronUpIcon className="h-4 w-4" />
                        )
                      ) : (
                        <ArrowsUpDownIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </span>
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-300">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-center text-gray-500"
              >
                No hay registros
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={getRowId(row)}
                className="hover:bg-gray-50"
              >
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className="px-4 py-3"
                  >
                    <div className="flex justify-center">
                      {column.render
                        ? column.render(row)
                        : column.accessor
                          ? (row[column.accessor] as React.ReactNode)
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
  );
}