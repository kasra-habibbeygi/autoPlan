import React, { useState } from 'react';
import { CircularProgress, Pagination } from '@mui/material';

//Assets
import { PaginationWrapper, TableComponent } from './Table.style';

const Table = ({ columns, rows, pageStatus, setPageStatus, loading = false }) => {
    const [showElement, setShowElement] = useState(false);
    const [elementPosition, setElementPosition] = useState({
        x: 0,
        y: 0
    });

    const showTooltipHandler = e => {
        !showElement && setShowElement(true);
        setElementPosition({
            x: e.pageX - 45,
            y: e.pageY - 300
        });
    };

    return (
        <>
            <TableComponent showElement={showElement} elementPosition={elementPosition}>
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
                                    <tr key={row.id} onMouseMove={showTooltipHandler} onMouseLeave={() => setShowElement(false)}>
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
                    </>
                )}
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
