import { MongoClient, ObjectId } from "mongodb";
import rp from "request-promise";

const genId = () => (Math.random() * 10e9).toFixed().toString();

export const resolvers = ({ Channels }) => {
  return {
    Query: {
      // savedRecipes: async () => {
      //   return await SavedRecipes.find({}).toArray();
      // },
      recipes: async (root, args, context, info) => {
        console.log("arguments for recipes query", root, args, context, info);
        const params = args && args.keywords && args.keywords.join(",");
        const options = {
          uri: `http://api.yummly.com/v1/api/recipes?_app_id=3749ecd0&_app_key=f2d7e42e718a093a05a25d495c821b1f&q=${params}&requirePictures=true`,
          json: true
        };

        const { matches } = await rp(options);
        matches.forEach(match => {
          match.imageUrl = `${match.smallImageUrls[0].substring(
            0,
            match.smallImageUrls[0].length - 4
          )}=s480-c-e365`;
        });
        console.log("matches", matches);
        return matches;
      }
    },
    Mutation: {
      addChannel: async (root, args, context, info) => {
        console.log("args", args);
        args.id = genId();
        const res = await Channels.insert(args);
        return await Channels.findOne({ _id: res.insertedIds[1] });
      },
      deleteChannel: async (root, args, context, info) => {
        console.log("delete args", args);
        const res = await Channels.deleteOne({ id: args.id });
        return res;
      }
    }
  };
};
