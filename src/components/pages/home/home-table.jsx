import React from 'react';

//Assets

//Components
import { TableWrapper } from './home-table.style';

const HomeTable = ({ data }) => {
    return (
        <TableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>خودرو</th>
                        <th>پلاک خودرو</th>
                        <th>نام تعمیرکار</th>
                        <th>جایگاه</th>
                        <th>هرم</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.car}</td>
                            <td>{item.license}</td>
                            <td>{item.mechanicCode}</td>
                            <td>{item.position}</td>
                            <td>{item.pyramid}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </TableWrapper>
    );
};

export default HomeTable;
