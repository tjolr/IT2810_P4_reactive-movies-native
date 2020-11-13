export interface IMovieState {
  searchString: string;
  page: number;
  filter: IFilter;
  sort: ISort;
  searchIsLoading: boolean;
  filterIsLoading: boolean;
}

export interface IFilter {
  rating: IRangeSlider;
  release_year: IRangeSlider;
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
