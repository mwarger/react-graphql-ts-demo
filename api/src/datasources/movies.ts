import { DataSource } from 'apollo-datasource';

import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const movieAdapter = new FileSync('./data/movies.json');
const movieDatabase: any = low(movieAdapter).get('movies');

const creditAdapter = new FileSync('./data/credits.json');
const creditDatabase: any = low(creditAdapter).get('results');

interface Credit {
  id: string;
  name: string;
  character?: string;
  profile_path?: string;
}

interface Movie {
  id: string;
  title: string;
  overview?: string;
  backdrop_path?: string;
  poster_path?: string;
  popularity: number;
  favorite: boolean;
  cast?: Credit[];
}

class MovieDataSource extends DataSource {
  constructor() {
    super();
  }

  nowPlaying() {
    return movieDatabase.sortBy('title').value();
  }

  popular() {
    return movieDatabase
      .filter((movie: Movie) => movie.popularity > 100)
      .sortBy('popularity')
      .value()
      .reverse();
  }

  movieById(id: number) {
    let movie = movieDatabase.find({ id: +id }).value();
    return movie || movieDatabase.find({ id }).value();
  }

  getCredits(id: number) {
    return creditDatabase.find({ id: +id }).value() || [];
  }

  toggleFavorite(id: number) {
    const movie = movieDatabase.find({ id: +id }).value();

    return movieDatabase
      .find({ id: +id })
      .assign({ favorite: !movie.favorite })
      .write();
  }
}

export default MovieDataSource;
