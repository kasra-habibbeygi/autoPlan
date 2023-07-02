import React from 'react';

//Assets

//Components
import { TableComponent } from './Table.style';

const Table = ({ columns, rows }) => {
    return (
        <TableComponent>
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column.id}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={row.id}>
                        {columns.map((column, colIndex) =>
                            colIndex === 0 ? (
                                <td key={column.id}>{rowIndex + 1}</td>
                            ) : (
                                <td key={column.id}>{row[column.key] ? row[column.key] : column.renderCell}</td>
                            )
                        )}
                    </tr>
                ))}
            </tbody>
        </TableComponent>
    );
};

export default Table;
