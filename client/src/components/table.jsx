import React from 'react'

import { useTable } from 'react-table';
import { v4 as uuidv4 } from 'uuid';

const columns = [
    { accessor: '_id', Header: 'Order ID' },
    { accessor: 'name', Header: 'Name' },
    { accessor: 'number', Header: 'Number' },
    { accessor: 'address', Header: 'Address' },
    { accessor: 'email', Header: 'Email' },
    { accessor: 'ownerOrder', Header: 'owner Order' },
  ];

const Table = ({data}) => {

 const {
  getTableProps,
  getTableBodyProps,
   headerGroups,
  rows,
   prepareRow,
 } = useTable({data, columns});


  return (
    <>
    <table {...getTableProps()} className="bg-white ">
      <thead className="">
        {headerGroups.map((headerGroup) => (
            <tr key={uuidv4()} >
            {headerGroup.headers.map((column) => (
              <th key={uuidv4()} className="ring-1 ring-black px-2">{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => {
          
          prepareRow(row);
          return (
            <tr key={uuidv4()} {...row.getRowProps()} className="text-center ">
              {row.cells.map((cell) => (
                <td key={uuidv4()} className="ring-1 ring-black px-2 p-2">{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  )
}

export default Table