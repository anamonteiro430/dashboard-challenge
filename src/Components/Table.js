import React, { useState, useReducer, useEffect } from 'react';
import { reducer, initialState } from './../Reducers/index';
import { useRouteMatch } from 'react-router-dom';
import arrowUP from './../Images/arrowUp.png';
import createPersistedReducer from 'use-persisted-reducer';

export const Table = () => {
  const usePersistedReducer = createPersistedReducer('data');
  const [state, dispatch] = usePersistedReducer(reducer, initialState);
  const [edit, setEdit] = useState(false);
  const [sortNew, setSortNew] = useState(true);
  const match = useRouteMatch();
  const { id } = match.params;

  console.log('??????', state);
  /*filter to get the current table*/

  useEffect(() => {
    dispatch({ type: 'getTable', payload: Number(id) });
    console.log('STATE', state);
    console.log(state.draft);
  }, [state.draft, state.tables, state.table, id]);

  const handleChange = (event) => {
    const data = {
      value: event.target.value,
      name: event.target.name,
      data_id: event.target.dataset.id,
    };
    dispatch({ type: 'handleChange', payload: data });
  };

  const discard = () => {
    setEdit(false);
    dispatch({ type: 'discard' });
  };

  const editing = () => {
    console.log('EDIting');
    setEdit(true);
    dispatch({ type: 'edit', payload: id });
  };

  const confirm = () => {
    setEdit(false);
    dispatch({ type: 'confirm', payload: id });
  };
  const sortAsc = () => {
    console.log('sorting');

    setSortNew(false);
    dispatch({ type: 'sortAsc', payload: '' });
    console.log('NOW', state.table.content);
  };

  const newFirst = () => {
    console.log('sorting');

    setSortNew(true);
    dispatch({ type: 'sortNew' });
    console.log('NOW', state.table.content);
  };

  return (
    <div class="table_wrapper">
      <div class="table-action">
        {/* table information and buttons */}
        <h1>{state.table.name}</h1>
        {edit ? (
          <div className="button-wrapper">
            <button
              onClick={() => dispatch({ type: 'addButton' })}
              className="addBtn"
            >
              Add New Element
            </button>
            <button onClick={confirm} className="confirmBtn">
              Confirm
            </button>
            <button onClick={discard} className="discardBtn">
              Discard
            </button>
          </div>
        ) : (
          <div className="button-wrapper">
            <button onClick={editing} className="editBtn">
              Edit Table
            </button>
            {sortNew ? (
              <button onClick={sortAsc} className="sortBtn">
                <img src={arrowUP} />
              </button>
            ) : (
              <button onClick={newFirst} className="sortBtnFirst">
                <p>New first</p>
              </button>
            )}
          </div>
        )}
      </div>
      {/* table header and fields*/}
      <div id="table">
        <div class="table-header">
          {edit
            ? state.table.fields.map((field) =>
                field.field === 'Created' ? null : (
                  <div
                    class="table-header-class"
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
                <div class="table-header-class">
                  <h3>{field.field}</h3>
                  <p>{field.subfield}</p>
                </div>
              ))}
        </div>
        {/* table rows */}
        <div class="table-rows">
          {edit ? (
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
