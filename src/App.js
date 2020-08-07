import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Nav } from './Components/Nav';
import { SearchBar } from './Components/SearchBar';
import { Main } from './Components/Main';
import { Table } from './Components/Table';

function App() {
  return (
    <div className="App">
      <Nav />

      <Switch>
        <Route exact path="/">
          <SearchBar />
          <Main />
        </Route>
        <Route path="/table/:id" component={Table}></Route>
      </Switch>
    </div>
  );
}

export default App;
