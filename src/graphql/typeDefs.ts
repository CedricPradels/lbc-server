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
    dealer: User
    id: ID
  }

  type Offers {
    result: [Offer]
    count: Int
  }

  type Query {
    login(email: String!, password: String!): User
    offer(id: ID): Offer
    offers(
      page: Int
      limit: Int
      priceMin: Int
      priceMax: Int
      search: String
      sort: String # "ascPrice" | "desPrice" |  "ascDate" | "desDate"
    ): Offers
  }
  type Mutation {
    register(email: String!, alias: String, password: String!): User
    publish(
      title: String
      description: String
      price: Int
      pictures: [String]
      token: String
    ): Offer
    delete(id: ID, token: String): Offer
  }
`;
