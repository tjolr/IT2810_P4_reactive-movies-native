export interface IMovieState {
  searchString: string;
  pagination: IPagination;
  filter: IFilter;
  sort: ISort;
  searchIsLoading: boolean;
}

export const rowsPerPage = 25;

export interface IFilter {
  rating: IRangeSlider;
  release_year: IRangeSlider;
}

export interface IPagination {
  page: number;
  pageInterval: number[];
  totalRowCount: number;
  totalPages: number;
}

export interface IRangeSlider {
  from: number;
  to: number;
}

export interface ISort {
  field: string | null;
  direction: SortDirection;
}

export type SortDirection = 'asc' | 'desc' | null;

export const defaultSort: ISort = {
  field: 'popularity',
  direction: 'desc',
};

export const sortDirectionList: SortDirection[] = [null, 'asc', 'desc'];
export const sortDirectionListLength: number = sortDirectionList.length;
export const defaultSortDirection: SortDirection = sortDirectionList[0];
