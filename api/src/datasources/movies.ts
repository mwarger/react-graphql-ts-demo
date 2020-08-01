import { DataSource } from 'apollo-datasource';

import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const movieAdapter = new FileSync('./data/movies.json');
const movieDatabase: any = low(movieAdapter);

const creditAdapter = new FileSync('./data/credits.json');
const creditDatabase: any = low(creditAdapter).get('results');

class MovieDataSource extends DataSource {
  constructor() {
    super();
  }

  initialize(config: any) {}

  nowPlaying(args: any) {
    return movieDatabase.get('nowPlaying').value();
  }

  popular(args: any) {
    return movieDatabase.get('popular').value();
  }

  // NOT REALLY EFFICIENT - BUT WORKS FOR NOW
  movieById(id: number) {
    let movie = movieDatabase
      .get('nowPlaying')
      .find({ id: +id })
      .value();
    return (
      movie ||
      movieDatabase
        .get('popular')
        .find({ id: +id })
        .value()
    );
  }

  getCredits(movieId: number) {
    return creditDatabase.find({ id: +movieId }).value() || [];
  }
}

export default MovieDataSource;
