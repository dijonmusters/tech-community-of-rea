import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { createUploadLink } = require('apollo-upload-client')

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  link: createUploadLink(),
})

const Apollo = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default Apollo
