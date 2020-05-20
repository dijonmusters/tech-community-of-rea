import React from 'react';
import { Normalize } from 'styled-normalize';
import ApolloProvider from './context/Apollo';
import Router from './components/Router';
import GlobalStyles from './styles/GlobalStyles';
import styled from 'styled-components';

const Container = styled.main`
  min-height: 100vh;
  background-color: #ffde22;
  display: flex;
`;

const App = () => {
  return (
    <ApolloProvider>
      <Normalize />
      <GlobalStyles />
      <Container>
        <Router />
      </Container>
    </ApolloProvider>
  );
};

export default App;

// TODO: Router
// TODO: prettier
// TODO: Install styled components
// TODO: Install react hook form
// TODO: Fill in README

// TODO: Talk to James about loading page being a digital version of strings
