import { gql } from "apollo-server";

export default gql`
  type User {
    alias: String
    email: String
    token: String
  }

  # scalar Date
  type Offer {
    pictures: [String]
    title: String
    price: Int
    date: String #ADD SCALAR
    description: String
    dealer: String
    id: ID
  }

  type Query {
    login(email: String!, password: String!): User
    offer(id: ID): Offer
  }
  type Mutation {
    register(email: String!, alias: String, password: String!): User
    publish(
      title: String
      descrition: String
      price: Int
      pictures: [String]
      token: String
    ): Offer
  }
`;
