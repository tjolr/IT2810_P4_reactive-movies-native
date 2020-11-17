import gql from 'graphql-tag';
import {
  IMovieItemField,
  MovieItemDetailFields,
  MovieItemFields,
} from '../components/DataScreen/MovieList/models/movieItem.model';

export const buildMovieQuery = () => {
  const fields: string[] = [];
  MovieItemFields.map((movieItem: IMovieItemField) =>
    fields.push(movieItem.field)
  );

  const fieldString = fields.join('\n');

  const query = gql`
    query($searchString: String, $page: Int, $filter: Filter, $sort: Sort) {
      Movie(
        searchString: $searchString
        page: $page
        filter: $filter
        sort: $sort
      ) {
        movies {
          ${fieldString}
        }
        totalRowCount 
      }
    }
  `;

  return query;
};

export const getDetailMovieQuery = () => {
  const fields: string[] = [];
  MovieItemDetailFields.map((movieItem: IMovieItemField) =>
    fields.push(movieItem.field)
  );

  const fieldString = fields.join('\n');

  const query = gql`
  query($searchString: String) {
    Movie(searchString: $searchString) {
      movies {
        ${fieldString}
      }
    }
  }
  `;
  return query;
};

export const MOVIE_REVIEW_QUERY = gql`
  query($movieId: String) {
    Reviews(movie_id: $movieId) {
      movie_id
      author
      text
    }
  }
`;
