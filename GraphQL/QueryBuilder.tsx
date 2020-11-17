import gql from 'graphql-tag';
import { MovieItemFields } from '../components/DataScreen/MovieList/models/movieItem.model';

export const buildMovieQuery = () => {
  const fields: string[] = [];
  MovieItemFields.map((movieItem) => fields.push(movieItem.field));

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
          genres {
            name
          }
          crew {
            name
            job
          }
        }
        totalRowCount 
      }
    }
  `;

  return query;
};

export const DETAIL_MOVIE_QUERY = gql`
  query($searchString: String) {
    Movie(searchString: $searchString) {
      movies {
        tagline
        overview
        genres {
          name
        }
      }
    }
  }
`;

export const MOVIE_REVIEW_QUERY = gql`
  query($movieId: String) {
    Reviews(movie_id: $movieId) {
      movie_id
      author
      text
    }
  }
`;
