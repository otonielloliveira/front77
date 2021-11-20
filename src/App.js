
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from "./components/PrivateRoute";

import Login   from './views/Pages/Login'
import Dashboard from './views/Pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Switch >
        <Route component={Login} path="/login" render={props => <Login {...props}/>} />
        <PrivateRoute component={Dashboard} path="/" exact  />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
