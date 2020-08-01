import { gql } from 'apollo-server';

export default gql`
  type Movie {
    id: ID!
    title: String!
    overview: String!
    backdrop_path: String!
    poster_path: String!
    cast: [Credit!]
  }

  type Credit {
    id: ID!
    name: String!
    character: String!
    profile_path: String
  }

  type Query {
    nowPlaying: [Movie!]
    popular: [Movie!]
    movieById(id: ID!): Movie
    cast(movieId: ID!): [Credit]
    me: User
    # users: [User!]
    # userById: User
  }

  type User {
    id: String!
    email: String!
    favorites: [Movie!]
  }

  input Credentials {
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User
  }

  type Mutation {
    toggleFavoriteMovie(movieId: ID!): User
    signUp(credentials: Credentials!): AuthPayload
    signIn(credentials: Credentials!): AuthPayload
    userInfo: AuthPayload
    signOut: AuthPayload
  }
`;
