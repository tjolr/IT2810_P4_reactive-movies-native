export interface IMovieItemField {
  field: string;
  hide?: boolean;
}

export const MovieItemFields: IMovieItemField[] = [
  { field: 'id', hide: true },
  { field: '_id', hide: true },
  { field: 'title' },
  { field: 'release_date' },
  { field: 'vote_average' },
  { field: 'runtime' },
  { field: 'vote_count' },
  { field: 'overview' },
];
