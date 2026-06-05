// src/types/shared/BasePagedResponse

export type BaseQueryParams = {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  filterBy?: string;
  sortBy?: string;
  sortDescending?: boolean;
};