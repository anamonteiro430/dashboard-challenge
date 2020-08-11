import React, { useReducer, useEffect } from 'react';
import { reducer, initialState } from './../Reducers/index';
import { useRouteMatch } from 'react-router-dom';

export const EditTable = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const match = useRouteMatch();
  const { id } = match.params;

  const handleChange = (event) => {
    const data = {
      value: event.target.value,
      name: event.target.name,
      data_id: event.target.dataset.id,
    };
    dispatch({ type: 'handleChange', payload: data });
  };

  useEffect(() => {
    dispatch({ type: 'getTable', payload: Number(id) });
    console.log('STATESTATUIC', state);
  }, [state.draft, state.tables, state.table, id, state.editValue]);

  return (
    <>
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
      <div id="table">
        <div class="table-header">
          {state.table.fields.map((field) =>
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
          )}
        </div>
        {/* table rows */}
        <div class="table-rows">
          {/* EDITING TABLE*/}
          <div>
            {state.draft.content.map((column) => (
              <div style={{ display: 'flex' }}>
                <div className="table-row" key={column.id}>
                  {Object.keys(column).map((s) => (
                    <input
                      value={column[s]}
                      type="text"
                      name={s}
                      data-id={column.id}
                      onChange={handleChange}
                      style={{
                        width: `${state.input}vw`,
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() =>
                    dispatch({ type: 'deleteRow', payload: column.id })
                  }
                  className="close-button"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>{' '}
    </>
  );
};
