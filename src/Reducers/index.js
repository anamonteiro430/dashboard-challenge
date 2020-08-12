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
        { id: 2, name: 'France', acr: 'FR', mort: '10dd0' },
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
    id: 2,
    name: 'INITIAL TABLE',
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
      { id: 1, name: 'Portugal', portas: '5', pmin: '100', pmax: '120' },
      { id: 2, name: 'Portugal', portas: '7', pmin: '110', pmax: '130' },
    ],
  },
  draft: null,
  sortNew: true,
  edit: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'discard': {
      console.log('im in discard');
      return {
        ...state,
        edit: false,
      };
    }

    case 'edit': {
      return {
        ...state,
        edit: true,
        draft: state.tables.filter((f) => f.id === Number(action.payload))[0],
      };
    }

    case 'confirm': {
      return {
        ...state,
        edit: false,
        tables: state.tables.map((t) =>
          t.id === state.draft.id ? state.draft : t
        ),
      };
    }

    case 'handleChange': {
      let data = action.payload;

      let x = state.draft.content.filter(
        (f) => f.id === Number(data.data_id)
      )[0];

      let y = {
        ...x,
        [data.name]: data.value,
      };

      return {
        ...state,
        draft: {
          ...state.draft,
          content: state.draft.content.map((c) =>
            c.id === Number(data.data_id) ? y : c
          ),
        },
      };
    }

    case 'addButton': {
      let newId = 0;
      if (state.draft.content.length > 0) {
        newId = state.draft.content.length;
        newId++;
      }

      let x = state.draft.content.map((key) => key)[0];
      let newArr = Object.keys(x);
      let newObj = {};

      newArr.map((q) => (q === 'id' ? (newObj[q] = newId) : (newObj[q] = '')));

      return {
        ...state,
        draft: {
          ...state.draft,
          content: [...state.draft.content, newObj],
        },
      };
    }

    case 'sortAsc': {
      let sorted = state.table.content.sort(function (a, b) {
        var keyA = a.name,
          keyB = b.name;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

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
        sortNew: !state.sortNew,
      };
    }

    case 'sortNew': {
      let sorted = state.table.content.sort(function (a, b) {
        var keyA = a.id,
          keyB = b.id;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

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
        sortNew: !state.sortNew,
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
