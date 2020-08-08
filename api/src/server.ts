require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import MovieDataSource from './datasources/movies';

import typeDefs from './schema';
import resolvers from './resolvers';
import express from 'express';
const app = express();

export interface Context {
  dataSources: {
    movieDataSource: MovieDataSource;
  };
}

const dataSources = () => ({
  movieDataSource: new MovieDataSource(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

server.applyMiddleware({ app });

app.listen(process.env.PORT || 4000, () => {
  console.log(`graphQL running at port 4000`);
});
