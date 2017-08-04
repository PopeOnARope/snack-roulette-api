export const typeDefs = [
  `
  type Channel {
     name: String
     id: String
  }

  type Flavors {
    bitter: Float
    meaty: Float
    piquant: Float
    salty: Float
    sour: Float
    sweet: Float
  }

  type Recipe {
     recipeName: String
     ingredients: [String]
     flavors: Flavors
     imageUrl: String
  }

  type Query {
     channels: [Channel]
     recipes(
       keywords: [String]
     ): [Recipe]
  }

  type Mutation {
    addChannel(name: String!): Channel
    deleteChannel(id: String!): Channel
  }
`
];
