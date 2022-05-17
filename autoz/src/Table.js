import React, { useEffect, useState } from 'react';
import BaseTable from 'react-base-table'
import 'react-base-table/styles.css'

const API_URL = 'https://listing-creation.api.autoscout24.com';
const ENDPOINTS = {
  makes: 'makes'
}

const getData = (result) => {
  const headers = ['#', 'id', 'name', 'type', 'models'];
  const columns = headers.map((header, columnIndex) => ({
    key: `col${columnIndex}`,
    dataKey: `col${columnIndex}`,
    title: header,
    width: 0,
    flexGrow: 1
  }))

  const rows = result.makes.map((row, rowIndex) => {
    const rowData = {
      col0: rowIndex,
      col1: row.id,
      col2: row.name,
      col3: row.vehicleTypes,
      col4: row.models.length
    };

    return {
      id: `row${rowIndex}`,
      parentId: null,
      ...rowData
    };
  });
  return {
    columns,
    rows
  }
}

export function Table() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/${ENDPOINTS.makes}`)
      .then(res => res.json())
      .then((result) => {
          setIsLoaded(true);
          const data = getData(result);
          console.log({ data, result });
          setItems(data.rows);
          setColumns(data.columns);
        }, (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <BaseTable columns={columns} data={items}
                      fixed={false}
                      width={1200}
                      height={400} />;
  }
}
