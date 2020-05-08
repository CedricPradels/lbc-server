import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

import mongoose from "mongoose";
mongoose.connect(String(process.env.MONGODB_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => console.log("DB connected"));

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen(process.env.PORT)
  .then(({ url }) => console.log(`Welcome to ${url}`));
