import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

export const TableInfo = (props) => {
  const data = props.table;
  console.log('PROPSSSSSS', data);

  return (
    <>
      <Link
        to={{
          pathname: `/table/${data.id}`,
          state: data,
        }}
      >
        <div id="table_info">
          <h2>{data.name}</h2>
          <div class="fields">
            {data.fields.map((field) => (
              <p>{field}</p>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};
