import { gql } from '@apollo/client';
export const NOW_PLAYING = gql`
  query nowPlaying {
    nowPlaying {
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
