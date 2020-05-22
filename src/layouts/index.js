import React from 'react'
import { Normalize } from 'styled-normalize'
import styled from 'styled-components'

import ApolloProvider from '../context/Apollo'
import GlobalStyles from '../styles/GlobalStyles'

const Container = styled.main`
  min-height: 100vh;
  background-color: #ffde22;
  color: #333;
  font-weight: 500;
  display: flex;
`

const Index = ({ children }) => {
  return (
    <ApolloProvider>
      <Normalize />
      <GlobalStyles />
      <Container>{children}</Container>
    </ApolloProvider>
  )
}

export default Index

// TODO: Confirm all options
// TODO: Add drop feedback and loading
// TODO: Style form errors
// TODO: Fill in README
// TODO: Create landing page grid layout
// TODO: Delete test records
// TODO: Build hype
