require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import MovieDataSource from './datasources/movies';
// import UserDataSource from './datasources/users';

import typeDefs from './schema';
import resolvers from './resolvers';
// import { verifyToken } from "./utils/auth";
// import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();

const dataSources = () => ({
  movieDataSource: new MovieDataSource(),
  // userDataSource: new UserDataSource(),
});

// app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req, res }) => {
    let user = null;
    // if (req.cookies.token) {
    //   const payload = verifyToken(req.cookies.token);
    //   user = payload;
    // }

    return { user, res };
  },
});

server.applyMiddleware({ app });

app.listen(process.env.PORT || 4000, () => {
  console.log(`graphQL running at port 4000`);
});
