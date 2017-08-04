import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import cors from "cors";
import { typeDefs } from "./src/schema";
import { resolvers } from "./src/resolvers";

const URL = "http://localhost";
const PORT = 4000;
const MONGO_URL = "mongodb://localhost:27017/blog";

const genId = () => (Math.random() * 10e9).toFixed().toString();

const start = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL);
    const Channels = db.collection("channels");
    // const SavedRecipes = db.collection("savedRecipes");

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers: resolvers({ Channels })
    });

    const app = express();

    app.use(cors());

    app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

    app.use(
      "/graphiql",
      graphiqlExpress({
        endpointURL: "/graphql"
      })
    );

    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
