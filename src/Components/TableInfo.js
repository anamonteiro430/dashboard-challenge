import React from 'react';

export const TableInfo = (props) => {
  console.log('props', props);
  const data = props.table;
  return (
    <div id="table_info">
      <h2>{data.name}</h2>
      <div class="fields">
        {data.fields.map((field) => (
          <p>{field}</p>
        ))}
      </div>
    </div>
  );
};
