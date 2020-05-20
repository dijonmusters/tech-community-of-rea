import React from 'react';
import { Normalize } from 'styled-normalize';
import styled from 'styled-components';

import ApolloProvider from '../context/Apollo';
import GlobalStyles from '../styles/GlobalStyles';

const Container = styled.main`
  min-height: 100vh;
  background-color: #ffde22;
  color: #333;
  font-weight: 500;
  display: flex;
`;

const Index = ({ children }) => {
  return (
    <ApolloProvider>
      <Normalize />
      <GlobalStyles />
      <Container>{children}</Container>
    </ApolloProvider>
  );
};

export default Index;

// TODO: Router
// TODO: prettier
// TODO: Install styled components
// TODO: Install react hook form
// TODO: Fill in README

// TODO: Talk to James about loading page being a digital version of strings
