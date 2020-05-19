import React from 'react';
import ApolloProvider from './context/Apollo';
import Router from './components/Router';

const App = () => {
  return (
    <ApolloProvider>
      <Router />
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
