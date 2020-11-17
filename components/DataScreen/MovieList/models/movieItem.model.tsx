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
];

export const MovieItemDetailFields: IMovieItemField[] = [
  { field: '_id' },
  { field: 'runtime' },
  { field: 'vote_count' },
  { field: 'overview' },
  { field: 'tagline' },
  { field: 'genres { name }' },
  { field: 'crew { name job }' },
];
