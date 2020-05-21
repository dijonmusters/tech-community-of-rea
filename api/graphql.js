import { ApolloServer, gql } from 'apollo-server-micro'
import { characters, character, createCharacter, updateCharacter } from './_db'

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
    id: String!
  }

  input UpdateCharacterInput {
    id: String!
    username: String
    jobLevel: String
    ide: String
    language: String
    indentWidth: String
    dreamTitle: String
  }

  input CreateCharacterInput {
    id: String!
  }

  type Query {
    characters: [Character]
    character(input: CharacterInput): Character
  }

  type Mutation {
    createCharacter(input: CreateCharacterInput): Character
    updateCharacter(input: UpdateCharacterInput): Character
  }
`

const resolvers = {
  Query: {
    characters,
    character,
  },
  Mutation: {
    createCharacter,
    updateCharacter,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

export default handler
