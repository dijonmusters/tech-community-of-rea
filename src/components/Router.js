import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharacterList from './CharacterList';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/'>
        <CharacterList />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
