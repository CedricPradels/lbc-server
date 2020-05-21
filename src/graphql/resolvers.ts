import User from "../models/User";
import Offer from "../models/Offer";

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
    offer: async (_, args) => {
      try {
        const id = args.id;
        const queryOffer = await Offer.findById(id).lean(true);

        if (!queryOffer) throw "Offer not found";

        const offersCount = await Offer.estimatedDocumentCount({
          dealer: queryOffer.dealer,
        });

        const queryDealer = await User.findById(queryOffer.dealer);

        const result = {
          ...queryOffer,
          dealer: {
            offersCount,
            alias: queryDealer ? queryDealer.alias : null,
          },
        };

        return result;
      } catch (error) {
        console.log(error);
      }
    },
    offers: async (_, args) => {
      try {
        const {
          page = 1,
          limit = 3,
          priceMin = 0,
          priceMax = Infinity,
          sort = "descDate",
          search = "",
        } = args;

        let sortArg;
        switch (sort) {
          case "ascDate":
            sortArg = { date: "asc" };
            break;
          case "descDate":
            sortArg = { date: "desc" };
            break;
          case "ascPrice":
            sortArg = { price: "asc" };
            break;
          case "descPrice":
            sortArg = { price: "desc" };
            break;
          default:
            sortArg = { date: "desc" };
        }

        const query = {
          $or: [
            {
              price: { $gte: priceMin, $lte: priceMax },
              title: RegExp(search, "i"),
            },
            {
              price: { $gte: priceMin, $lte: priceMax },
              description: RegExp(search, "i"),
            },
          ],
        };

        const result = await Offer.find(query)
          .sort(sortArg)
          .skip(limit * (page - 1))
          .limit(limit);

        const count = await Offer.find(query).countDocuments();
        return { result, count };
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
    publish: async (_, args) => {
      try {
        const { pictures, title, price, description, token } = args;

        const queryUser = await User.findOne({ token }).lean(true);

        if (!queryUser) throw "Invalid token";
        const dealer = queryUser._id;

        const date = Date.now().toString();
        const newOffer = await Offer.create({
          title,
          description,
          price,
          date,
          pictures,
          dealer,
        });
        return newOffer;
      } catch (error) {
        console.log(error);
      }
    },
    delete: async (_, args) => {
      try {
        const { id, token } = args;

        const queryUser = await User.findOne({ token }).lean(true);
        if (!queryUser) throw "Wrong token";
        const dealer = queryUser._id;
        const deletedOffer = await Offer.findOneAndDelete({ dealer, _id: id });
        return deletedOffer;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default resolvers;
