import { gql } from "apollo-server";

export default gql`
  type Movie {
    id: ID!
    title: String!
  }

  type Query {
    me: User
    users: [User!]
    userById: User
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
