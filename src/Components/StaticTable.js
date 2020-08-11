import React, { useState, useReducer, useEffect } from 'react';
import { reducer, initialState } from './../Reducers/index';
import { useRouteMatch } from 'react-router-dom';
import arrowUP from './../Images/arrowUp.png';

export const StaticTable = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const match = useRouteMatch();
  const { id } = match.params;

  const editing = () => {
    props.setEdit(true);
    dispatch({ type: 'editButton', payload: id });
  };

  useEffect(() => {
    dispatch({ type: 'getTable', payload: Number(id) });
    console.log('STATESTATUIC', state);
  }, [state.draft, state.tables, state.table, id, state.editValue]);

  return (
    <>
      <div class="table-action">
        <div className="button-wrapper">
          <h1>{state.table.name}</h1>
          <button onClick={editing} className="editBtn">
            Edit Table
          </button>
          {state.sortNew ? (
            <button
              onClick={() => dispatch({ type: 'sortAsc' })}
              className="sortBtn"
            >
              <img src={arrowUP} alt="sort by ascendent order" />
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: 'sortNew' })}
              className="sortBtn"
            >
              <p>New first</p>
            </button>
          )}
        </div>
      </div>
      {/* table header and fields*/}
      <div id="table">
        <div class="table-header">
          {state.table.fields.map((field) => (
            <div
              class="table-header-class"
              style={{
                width: `${state.input}vw`,
              }}
            >
              <h3>{field.field}</h3>
              <p>{field.subfield}</p>
            </div>
          ))}
        </div>
        {/* table rows */}
        <div class="table-rows">
          {state.table ? (
            /* STATIC TABLE*/
            <div>
              {state.table.content.map((column) => (
                <div className="table-row-static">
                  {Object.values(column).map((s) => (
                    <p
                      style={{
                        width: `${state.input}vw`,
                      }}
                    >
                      {s}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p>wait</p>
          )}
          /
        </div>
      </div>
    </>
  );
};
