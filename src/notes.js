// const typeDefs = [
//   `
//   type Channel {
//      name: String
//      id: String
//   }
//
//   type Query {
//      channels: [Channel]
//   }
//
//   type Mutation {
//     addChannel(name: String!): Channel
//     deleteChannel(id: String!): Channel
//   }
// `
// ];

// const resolvers = {
//   Query: {
//     channels: async () => {
//       console.log("getting channels");
//       return await Channels.find({}).toArray();
//     }
//   },
//   Mutation: {
//     addChannel: async (root, args, context, info) => {
//       console.log("args", args);
//       args.id = genId();
//       const res = await Channels.insert(args);
//       return await Channels.findOne({ _id: res.insertedIds[1] });
//     },
//     deleteChannel: async (root, args, context, info) => {
//       console.log("delete args", args);
//       const res = await Channels.deleteOne({ id: args.id });
//       return res;
//     }
// (root, args) => {
//   const newChannel = { id: nextId++, name: args.name };
//   channels.push(newChannel);
//   return newChannel;
// }
// }
// Query: {
//   post: async (root, { _id }) => {
//     return prepare(await Posts.findOne(ObjectId(_id)));
//   },
//   posts: async () => {
//     return (await Posts.find({}).toArray()).map(prepare);
//   },
//   comment: async (root, { _id }) => {
//     return prepare(await Comments.findOne(ObjectId(_id)));
//   }
// },
// Post: {
//   comments: async ({ _id }) => {
//     return (await Comments.find({ postId: _id }).toArray()).map(prepare);
//   }
// },
// Comment: {
//   post: async ({ postId }) => {
//     return prepare(await Posts.findOne(ObjectId(postId)));
//   }
// },
// Mutation: {
//   createPost: async (root, args, context, info) => {
//     const res = await Posts.insert(args);
//     return prepare(await Posts.findOne({ _id: res.insertedIds[1] }));
//   },
//   createComment: async (root, args) => {
//     const res = await Comments.insert(args);
//     return prepare(await Comments.findOne({ _id: res.insertedIds[1] }));
//   }
// }
