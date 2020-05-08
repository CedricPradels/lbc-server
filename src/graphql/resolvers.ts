import User from "../models/User";

import { createAuthentication } from "../helpers/authentication";
import { passwordP, emailP } from "../helpers/predicates";

import { IResolvers } from "apollo-server";

const resolvers: IResolvers = {
  Mutation: {
    register: async (parent, args, context, info) => {
      try {
        const { alias = "NoName", password, email } = args;

        // EMAIL ALREADY EXIST
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
