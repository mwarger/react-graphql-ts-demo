import { gql } from '@apollo/client';
const POPULAR = gql`
  # fill me in
  query popular {
    popular {
      id
      title
      overview
      poster_path
      backdrop_path
      favorite
      popularity
      cast {
        name
      }
    }
  }
`;
