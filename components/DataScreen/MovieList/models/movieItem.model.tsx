export interface IMovieItemField {
  field: string;
  hide?: boolean;
  sortable?: boolean;
}

export const MovieItemFields: IMovieItemField[] = [
  { field: 'id', hide: true },
  { field: '_id', hide: true },
  { field: 'title', sortable: true },
  { field: 'release_date', sortable: true },
  { field: 'vote_average', sortable: true },
  { field: 'runtime' },
  { field: 'vote_count' },
  { field: 'overview' },
  { field: 'tagline' },
];
