import React from 'react';
import { Nav } from './Components/Nav';
import { SearchBar } from './Components/SearchBar';
import { Main } from './Components/Main';

function App() {
  return (
    <div className="App">
      <Nav />
      <SearchBar />
      <Main />
    </div>
  );
}

export default App;
