
import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from './App.jsx';
import Index from './Index.jsx';
import Endpoints from './Endpoints.jsx';

import Login from './login/Login.jsx';
import LoginStrategies from './login/Strategies.jsx';
import LoginForm from './login/LoginForm.jsx';
import LoginToken from './login/LoginToken.jsx';
import Logout from './login/Logout.jsx';

export default (
  <Route path="/" handler={App}>
    <Route name="endpoints" path="/endpoints" handler={Endpoints} />
    <Route name="login" path="/login" handler={Login}>
      <Route name="loginForm" path="/login/form" handler={LoginForm} />
      <Route name="loginToken" path="/login/token/:token" handler={LoginToken} />
      <DefaultRoute handler={LoginStrategies} />
    </Route>
    <Route name="logout" path="/logout" handler={Logout} />
    <Route name="entity" path="/entity/:id" handler={Index} />
    <DefaultRoute name="index" handler={Index} />
  </Route>
);

