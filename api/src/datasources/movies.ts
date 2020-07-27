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

class MovieDataSource extends DataSource {
  nowPlayingDatabase: any;
  movieDatabase: any;

  constructor() {
    super();
    this.nowPlayingDatabase = nowPlayingDatabase.get('results');
    this.movieDatabase = movieDatabase.get('results');
  }

  initialize(config: any) {}

  nowPlaying(args: any) {
    return this.nowPlayingDatabase.value();
  }

  movieById(id: number) {
    return this.movieDatabase.find({ id: +id }).value();
  }

  allMovies() {
    return this.movieDatabase.value();
  }

  // createUser(user: any) {
  //   return this.db.insert(user).write();
  // }

  // getUserByEmail(email: any) {
  //   return this.db.find({ email }).value();
  // }
}

export default MovieDataSource;
