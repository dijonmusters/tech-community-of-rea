import { ApolloServer, gql } from 'apollo-server-micro';
import { characters, character } from './_db';

const typeDefs = gql`
  type Character {
    id: String!
    username: String
    jobLevel: String
    ide: String
    language: String
    indentWidth: String
    dreamTitle: String
  }

  input CharacterInput {
    id: String
  }

  type Query {
    characters: [Character]
    character(input: CharacterInput): Character
  }
`;

const resolvers = {
  Query: {
    characters,
    character,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler({ path: '/api/graphql' });

export default handler;
