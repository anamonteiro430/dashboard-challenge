export const initialState = {
  input: '200px',
  tables: [
    {
      id: 1,
      name: 'Países',
      fields: [
        { field: 'Id' },
        { field: 'Nome' },
        { field: 'Acrónimo', subfield: '(ISO 3166)' },
        {
          field: 'Taxa de mortalidade',
          subfield: '(mortes/ano/1000 habitantes)',
        },
      ],
      content: [
        { id: 1, name: 'Portugal', acr: 'PT', mort: '100' },
        { id: 2, name: 'France', acr: 'FR', mort: '1000' },
      ],
    },
    {
      id: 2,
      name: 'Tipos de Veículo',
      fields: [
        { field: 'Id' },
        { field: 'Nome ' },
        { field: 'Nº de portas' },
        {
          field: 'Potência mínima',
          subfield: '(CV)',
        },
        {
          field: 'Potência máxima',
          subfield: '(CV)',
        },
      ],
      content: [
        { id: 1, name: 'Mini', portas: '5', pmin: '100', pmax: '120' },
        { id: 2, name: 'Seat', portas: '7', pmin: '110', pmax: '130' },
      ],
    },
  ],
  table: {
    id: 1,
    name: 'Países',
    fields: [
      { field: 'Id' },
      { field: 'Nome' },
      { field: 'Acrónimo', subfield: '(ISO 3166)' },
      {
        field: 'Taxa de mortalidade',
        subfield: '(mortes/ano/1000 habitantes)',
      },
    ],
    content: [
      { id: 1, name: 'Portugal', acr: 'PT', mort: '100' },
      { id: 2, name: 'France', acr: 'FR', mort: '1000' },
    ],
  },
  draft: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'gettable': {
      /* {id: 1, name: "Países", fields: Array(3), content: Array(2)} */
      return {
        ...state,
        teste: true,
        table: action.payload,
      };
    }

    case 'discard': {
      return state;
    }

    case 'edit': {
      let id = Number(action.payload);
      console.log('editing table ', id);
      return {
        ...state,
        draft: state.tables.filter((f) => f.id == action.payload)[0],
        teste: 'EDITING',
      };
    }

    case 'confirm': {
      console.log('confirm ID, ', state.draft.id);
      let l = state.tables.filter((f) => f.id == state.draft.id)[0];
      console.log('PELEASEE, ', l);

      let l1 = state.draft;
      console.log('L111', l1);

      console.log(
        'WHATT',
        state.draft.id,
        state.tables.map((t) => (t.id === state.draft.id ? l1 : t))
      );
      return {
        ...state,
        tables: state.tables.map((t) => (t.id === state.draft.id ? l1 : t)),
      };
    }

    case 'handleChange': {
      /*UPDATE DRAFT OBJECT*/
      let data = action.payload;
      const id = Number(data.data_id);

      console.log(
        'HERE',
        state.draft
        /* state.draft.content.filter((f) => f.id === 2) */
      );
      let test = state.draft.content.filter((f) => f.id === id)[0];
      console.log('TEST', test);

      let test1 = {
        ...test,
        [data.name]: data.value,
      };
      console.log('SPREADING', { ...test });
      console.log('TEST1', test1);
      return {
        ...state,
        draft: {
          ...state.draft,
          content: state.draft.content.map((c) => (c.id === id ? test1 : c)),
        },
      };
    }

    case 'addButton': {
      console.log('Now in table ', state.draft.id);
      let newId = 0;
      if (state.draft.content.length > 0) {
        newId = state.draft.content[state.draft.content.length - 1].id;
      }

      return {
        ...state,
        draft: {
          ...state.draft,
          content: [
            ...state.draft.content,
            {
              id: newId + 1,
              name: '',
              acr: '',
              mort: '',
            },
          ],
        },
      };
      /* return {
        ...state,
        draft: {
          ...state.draft,
          content: 
          [state.draft.content,
          {
            id: 22,
            name: 'www',
            acr: 'www',
            mort: 'sss',
          })],
        },
      }; */
    }

    case 'sortAsc': {
      let sorted = state.table.content.sort(function (a, b) {
        var keyA = a.name,
          keyB = b.name;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      console.log('SORTED IN REDUCER', sorted);
      return {
        ...state,
        table: {
          ...state.table,
          content: sorted,
        },
        draft: {
          ...state.draft,
          content: sorted,
        },
      };
    }

    case 'sortNew': {
      let sorted = state.table.content.sort(function (a, b) {
        var keyA = a.id,
          keyB = b.id;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      console.log('SORTED IN REDUCER', sorted);
      return {
        ...state,
        table: {
          ...state.table,
          content: sorted,
        },
        draft: {
          ...state.draft,
          content: sorted,
        },
      };
    }

    case 'newFirst': {
      let sorted = state.table.content.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      console.log('SORTED IN REDUCER', sorted);
      return {
        ...state,
        table: {
          ...state.table,
          content: sorted,
        },
        draft: {
          ...state.draft,
          content: sorted,
        },
      };
    }

    case 'getTable': {
      let selectedTable = state.tables.filter(
        (table) => table.id === action.payload
      );

      const width = selectedTable[0].fields.length;
      return {
        ...state,
        table: selectedTable[0],
        input: 50 / width,
      };
    }

    case 'deleteRow': {
      let updatedContent = state.draft.content.filter(
        (u) => u.id !== action.payload
      );
      console.log('actionpayload', action.payload);
      console.log('deleting in reducer', updatedContent);

      return {
        ...state,
        draft: {
          ...state.draft,
          content: updatedContent,
        },
      };
    }

    default:
      return state;
  }
};
