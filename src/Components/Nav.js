import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <p>Brand</p>
      </Link>
    </nav>
  );
};
