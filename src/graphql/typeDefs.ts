import { gql } from "apollo-server";

export default gql`
  type Test {
    test: String
  }
  type Query {
    test: Test
  }
`;
