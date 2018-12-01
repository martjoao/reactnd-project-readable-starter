import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as Pages from './pages';

import './App.css';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={Pages.DefaultPage} />
      <Route path="/:category/:id" component={Pages.PostDetailsPage} />
      <Route path="/:category" component={Pages.CategoryPage} />
    </Switch>
  </div>
);

export default App;
