import React from 'react';
import { TableInfo } from './TableInfo';

export const Main = () => {
  const table_data = [
    {
      id: 1,
      name: 'País',
      fields: [
        'Nome',
        'Acrónimo (ISO 3166)',
        'Taxa de mortalidade (mortes/ano/1000 habitantes)',
      ],
    },
    {
      id: 2,
      name: 'Tipos de Veículo',
      fields: [
        'Nome',
        'Nº de Portas',
        'Potência Mínima (CV)',
        'Potência Máxima (CV)',
      ],
    },
  ];

  return (
    <div id="main">
      {table_data.map((table) => (
        <TableInfo table={table} />
      ))}
    </div>
  );
};
