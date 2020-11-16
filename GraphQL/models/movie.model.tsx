export interface IMovieListObject {
  __typename: string;
  _id: string;
  id: number;
  release_date: Date;
  title: string;
  vote_average: number;
  runtime: number;
  vote_count: number;
}
