import React from 'react';
import { CircularProgress, Pagination, Tooltip } from '@mui/material';

//Assets
import { PaginationWrapper, TableComponent } from './Table.style';

const Table = ({ columns, rows, pageStatus, setPageStatus, loading = false }) => {
    return (
        <>
            <TableComponent>
                {loading ? (
                    <div className='loading'>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    {columns.map(column => (
                                        <th key={column.id}>{column.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows?.map((row, rowIndex) => (
                                    <Tooltip
                                        key={row.id}
                                        followCursor
                                        title={
                                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                                <div>
                                                    <p style={{ color: '#174787', fontWeight: 900, fontSize: '16px' }}>زمان ثبت :</p>
                                                    <p style={{ color: 'black', fontSize: '12px', marginTop: '10px' }}>
                                                        1402/04/08 - 13:13
                                                    </p>
                                                </div>
                                                <br />
                                                <div>
                                                    <p style={{ color: '#174787', fontWeight: 900, fontSize: '16px' }}>آخرین ویرایش :</p>
                                                    <p style={{ color: 'black', fontSize: '12px', marginTop: '10px' }}>
                                                        1402/04/08 - 13:13
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <tr>
                                            {columns.map((column, colIndex) =>
                                                colIndex === 0 ? (
                                                    <td key={column.id}>{rowIndex + 1}</td>
                                                ) : (
                                                    <td key={column.id}>
                                                        {!column?.renderCell ? row[column.key] : column?.renderCell(row)}
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    </Tooltip>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </TableComponent>
            {pageStatus && setPageStatus && (
                <PaginationWrapper>
                    <Pagination
                        count={pageStatus.total}
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
