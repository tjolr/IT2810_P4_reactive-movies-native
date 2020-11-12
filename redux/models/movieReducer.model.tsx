export interface IMovieState {
  searchString: string;
  page: number;
  filter: IFilter;
  sort: ISort;
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
  field: string;
  direction: 'desc' | 'asc';
}
