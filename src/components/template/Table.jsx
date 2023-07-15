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
                                {rows.map((row, rowIndex) => (
                                    <Tooltip
                                        key={row.id}
                                        followCursor
                                        title={
                                            <div className='tooltip'>
                                                <div>
                                                    <p className='title'>زمان ثبت :</p>
                                                    <p className='text'>08/12/1424 22:45</p>
                                                </div>
                                                <div>
                                                    <p className='title'>آخرین ویرایش :</p>
                                                    <p className='text'>08/12/1424 11:36</p>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <tr>
                                            {columns.map((column, colIndex) =>
                                                colIndex === 0 ? (
                                                    <td key={column.id}>{rowIndex + 1}</td>
                                                ) : (
                                                    <td key={column.id}>{row[column.key] ? row[column.key] : column.renderCell(row)}</td>
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
