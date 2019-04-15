import React from 'react';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <h1>Root Page</h1>} />
      <Route path="/watch/:id" component={() => <h1>Watch Page</h1>} />
      <Route component={() => <h1>404</h1>} />
    </Switch>
  </BrowserRouter>
);

export default App;
