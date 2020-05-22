import { ApolloServer, gql } from 'apollo-server-micro'
import {
  characters,
  character,
  createCharacter,
  updateCharacter,
  uploadImage,
} from './_db'

const typeDefs = gql`
  type Character {
    id: String!
    username: String
    areaOfBusiness: String
    jobLevel: String
    ide: String
    language: String
    indentWidth: String
    dreamTitle: String
    imageUrl: String
  }

  type Url {
    url: String
  }

  input CharacterInput {
    id: String!
  }

  input UpdateCharacterInput {
    id: String!
    username: String
    areaOfBusiness: String
    jobLevel: String
    ide: String
    language: String
    indentWidth: String
    dreamTitle: String
    imageUrl: String
  }

  input CreateCharacterInput {
    username: String!
  }

  input UploadImageInput {
    image: Upload!
  }

  type Query {
    characters: [Character]
    character(input: CharacterInput): Character
  }

  type Mutation {
    createCharacter(input: CreateCharacterInput): Character
    updateCharacter(input: UpdateCharacterInput): Character
    uploadImage(input: UploadImageInput): Url
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
    uploadImage,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

export default handler
