require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import MovieDataSource from './datasources/movies';
import UserDataSource from './datasources/users';

import typeDefs from './schema';
import resolvers from './resolvers';
import express from 'express';
const app = express();

const dataSources = () => ({
  movieDataSource: new MovieDataSource(),
  userDataSource: new UserDataSource(),
});

export type UserType = {
  id: string;
  email: string;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req, res }) => {
    let user = { id: 'abc123', email: 'test_user@gmail.com' };

    return { user, res };
  },
});

server.applyMiddleware({ app });

app.listen(process.env.PORT || 4000, () => {
  console.log(`graphQL running at port 4000`);
});
