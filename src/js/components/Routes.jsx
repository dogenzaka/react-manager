
import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from './App.jsx';
import Index from './Index.jsx';
import Endpoints from './Endpoints.jsx';

export default (
  <Route path="/" handler={App}>
    <Route name="endpoints" path="/endpoints" handler={Endpoints} />
    <DefaultRoute handler={Index} />
  </Route>
);

