import { DataSource } from 'apollo-datasource';

import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('./data/users.json');
const db = low(adapter);

class UserDataSource extends DataSource {
  db: any;
  constructor() {
    super();
    this.db = db.get('users');
  }

  initialize(config: any) {
    this.db = db.get('users');
  }

  getUsers(args: any) {
    return this.db.value();
  }

  getUserById(id: any) {
    return this.db.find({ id }).value();
  }

  createUser(user: any) {
    return this.db.insert(user).write();
  }

  getUserByEmail(email: any) {
    return this.db.find({ email }).value();
  }

  toggleFavoriteMovie(movieId: string, userId: string) {
    const favorites =
      this.db.find({ id: userId }).get('favorites').value() || [];

    let set = [];
    if (favorites.includes(movieId)) {
      // remove it
      set = [...favorites.filter((fav: any) => fav !== movieId)];
    } else {
      // add it
      set = [...favorites, movieId];
    }

    return this.db.find({ id: userId }).assign({ favorites: set }).write();
  }
}

export default UserDataSource;
