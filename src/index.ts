import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen(process.env.PORT)
  .then(({ url }) => console.log(`Welcome to ${url}`));
