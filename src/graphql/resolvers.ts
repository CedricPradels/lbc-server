import User from "../models/User";

import { createAuthentication, checkPassword } from "../helpers/authentication";
import { passwordP, emailP } from "../helpers/predicates";

import { IResolvers } from "apollo-server";

const resolvers: IResolvers = {
  Query: {
    login: async (_, args) => {
      try {
        const { email, password } = args;
        const queryUser = await User.findOne({ email }).lean(true);
        if (queryUser === null) throw "User not found";
        const { hash, salt } = queryUser;
        if (!checkPassword({ password, hash, salt })) throw "Invalid password";

        return queryUser;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      try {
        const { alias = "NoName", password, email } = args;

        const queryEmail = await User.findOne({ email });
        if (queryEmail !== null) throw "Email already exist";
        if (!passwordP(password)) throw "Invalid password";
        if (!emailP(email)) throw "Invalid email";

        const authentication = createAuthentication(password);

        const newUser = await User.create({ alias, email, ...authentication });
        return newUser;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default resolvers;
