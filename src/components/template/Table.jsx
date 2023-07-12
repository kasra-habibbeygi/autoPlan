import React from 'react';
import { Pagination } from '@mui/material';

//Assets
import { PaginationWrapper, TableComponent } from './Table.style';

const Table = ({ columns, rows, pageStatus, setPageStatus }) => {
    return (
        <>
            <TableComponent>
                <table>
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
                                        <td key={column.id}>{row[column.key] ? row[column.key] : column.renderCell(row)}</td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableComponent>
            {pageStatus && setPageStatus && (
                <PaginationWrapper>
                    <Pagination
                        color='primary'
                        count={pageStatus.total}
                        size='small'
                        page={pageStatus.current}
                        onChange={(_, value) =>
                            setPageStatus(prev => {
                                return {
                                    ...prev,
                                    current: value
                                };
                            })
                        }
                    />
                </PaginationWrapper>
            )}
        </>
    );
};

export default Table;
