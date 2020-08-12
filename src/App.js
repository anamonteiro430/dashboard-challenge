import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Nav } from './Components/Nav';
import { Main } from './Components/Main';
import { Table } from './Components/Table';

function App() {
  console.log('IN APP');
  return (
    <div className="App">
      <Nav />

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/table/:id" component={Table}></Route>
      </Switch>
    </div>
  );
}

export default App;
