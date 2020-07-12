import { DataSource } from "apollo-datasource";
// import lodashId from "lodash-id";

import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("./data/users.json");
const db = low(adapter);
// db._.mixin(lodashId);

class UserDataSource extends DataSource {
  db: any;
  constructor() {
    super();
    this.db = db.get("users");
  }

  initialize(config: any) {
    this.db = db.get("users");
  }

  getUsers(args: any) {
    return this.db.value();
  }

  getUserById(id: any) {
    return this.db.getById(id).value();
  }

  createUser(user: any) {
    return this.db.insert(user).write();
  }

  getUserByEmail(email: any) {
    return this.db.find({ email }).value();
  }
}

export default UserDataSource;
