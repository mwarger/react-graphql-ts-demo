import { DataSource } from 'apollo-datasource';
// import lodashId from "lodash-id";

import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import Lowdb from 'lowdb';

const nowPlayingAdapter = new FileSync('./data/nowPlaying.json');
const nowPlayingDatabase = low(nowPlayingAdapter);
// nowPlayingDatabase._.mixin(lodashId);

const movieAdapter = new FileSync('./data/movies.json');
const movieDatabase = low(movieAdapter);

const creditAdapter = new FileSync('./data/credits.json');
const creditDatabase = low(creditAdapter);

class MovieDataSource extends DataSource {
  nowPlayingDatabase: any;
  movieDatabase: any;
  creditDatabase: any;

  constructor() {
    super();
    this.nowPlayingDatabase = nowPlayingDatabase.get('results');
    this.movieDatabase = movieDatabase.get('results');
    this.creditDatabase = creditDatabase.get('results');
  }

  initialize(config: any) {}

  nowPlaying(args: any) {
    return this.nowPlayingDatabase.value();
  }

  movieById(id: number) {
    return this.movieDatabase.find({ id: +id }).value();
  }

  getCredits(movieId: number) {
    return this.creditDatabase.find({ id: +movieId }).value() || [];
  }
}

export default MovieDataSource;
