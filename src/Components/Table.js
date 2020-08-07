import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

export const Table = (props) => {
  const data = props.location.state;

  return (
    <div>
      <h1>{data.name}</h1>
      <div class="table-wrapper">
        {data.fields.map((f) => (
          <h3>{f}</h3>
        ))}
      </div>
    </div>
  );
};
