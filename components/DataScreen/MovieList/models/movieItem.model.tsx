export interface MovieItemField {
  field: string;
  hide?: boolean;
}

export const MovieItemFields: MovieItemField[] = [
  { field: 'id', hide: true },
  { field: '_id', hide: true },
  { field: 'title' },
  { field: 'release_date' },
  { field: 'vote_average' },
];
