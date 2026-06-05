// src/types/shared/BasePagedResponse

export type BasePagedResponse<T> = {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};