import React, { useState, useReducer, useEffect } from 'react';
import { reducer, initialState } from './../Reducers/index';
import { useRouteMatch } from 'react-router-dom';
import arrowUP from './../Images/arrowUp.png';
import createPersistedReducer from 'use-persisted-reducer';
import { useHistory } from 'react-router-dom';

export const Table = () => {
  let history = useHistory();
  const usePersistedReducer = createPersistedReducer('data');
  const [state, dispatch] = usePersistedReducer(reducer, initialState);
  const match = useRouteMatch();
  const { id } = match.params;

  useEffect(() => {
    dispatch({ type: 'getTable', payload: Number(id) });
  }, [state.draft, state.tables, state.table, id, state.edit]);

  const handleChange = (event) => {
    const data = {
      value: event.target.value,
      name: event.target.name,
      data_id: event.target.dataset.id,
    };
    dispatch({ type: 'handleChange', payload: data });
  };

  return (
    <div className="table_wrapper">
      {state.edit ? null : (
        <button className="backBtn" onClick={() => history.push('/')}>
          All Tables
        </button>
      )}
      <div className="table-action">
        {/* table information and buttons */}
        <h1>{state.table.name}</h1>
        {state.edit ? (
          <div className="button-wrapper">
            <button
              onClick={() => dispatch({ type: 'addButton' })}
              className="addBtn"
            >
              Add New Element
            </button>
            <button
              onClick={() => dispatch({ type: 'confirm', payload: id })}
              className="confirmBtn"
            >
              Confirm
            </button>
            <button
              onClick={() => dispatch({ type: 'discard' })}
              className="discardBtn"
            >
              Discard
            </button>
          </div>
        ) : (
          <div className="button-wrapper">
            <button
              onClick={() => dispatch({ type: 'edit', payload: id })}
              className="editBtn"
            >
              Edit Table
            </button>
            {state.sortNew ? (
              <button
                className="sortBtn"
                onClick={() => dispatch({ type: 'sortAsc' })}
              >
                <img src={arrowUP} alt="sort ascendent order" />
              </button>
            ) : (
              <button
                onClick={() => dispatch({ type: 'sortNew' })}
                className="sortBtnFirst"
              >
                <p>New first</p>
              </button>
            )}
          </div>
        )}
      </div>
      {/* table header and fields*/}
      <div id="table">
        <div className="table-header">
          {state.edit
            ? state.table.fields.map((field) =>
                field.field === 'Created' ? null : (
                  <div
                    className="table-header-class"
                    style={{
                      width: `${state.input}vw`,
                    }}
                  >
                    <h3>{field.field}</h3>
                    <p>{field.subfield}</p>
                  </div>
                )
              )
            : state.table.fields.map((field) => (
                <div className="table-header-class">
                  <h3>{field.field}</h3>
                  <p>{field.subfield}</p>
                </div>
              ))}
        </div>
        {/* table rows */}
        <div className="table-rows">
          {state.edit ? (
            /* EDITING TABLE*/
            <div>
              {state.draft.content.map((c) => (
                <div style={{ display: 'flex' }}>
                  <div className="table-row" key={c.id}>
                    {Object.keys(c).map((w) => (
                      <input
                        value={c[w]}
                        type="text"
                        name={w}
                        data-id={c.id}
                        onChange={handleChange}
                        style={{
                          width: `${state.input}vw`,
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      dispatch({ type: 'deleteRow', payload: c.id })
                    }
                    className="close-button"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : state.table ? (
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
        </div>
      </div>
    </div>
  );
};
