// src/features/admin/utils/mapToSelectOptions.ts

import type { SelectOption } from "@/types/shared/UiTypes";

export function mapToSelectOptions<T>(
  items: T[],
  obtenerValor: (item: T) => string | number,
  obtenerLabel: (item: T) => string,
): SelectOption[] {
  return items.map(item => ({
    value: obtenerValor(item),
    label: obtenerLabel(item),
  }));
}