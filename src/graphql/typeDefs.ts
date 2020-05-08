import { gql } from "apollo-server";

export default gql`
  type User {
    alias: String
    email: String
    token: String
  }
  type Query {
    login(email: String!, password: String!): User
  }
  type Mutation {
    register(email: String!, alias: String, password: String!): User
  }
`;
