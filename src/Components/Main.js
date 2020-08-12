import React, { useReducer, useEffect } from 'react';
import { reducer, initialState } from './../Reducers/index';
import { useHistory } from 'react-router-dom';

export const Main = () => {
  let history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div id="main">
      {state.tables.map((table) => (
        <div id="table_info" onClick={() => history.push(`/table/${table.id}`)}>
          <h1>{table.name}</h1>
          <div class="fields">
            {table.fields.map((field) => (
              <p>{field.field}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
