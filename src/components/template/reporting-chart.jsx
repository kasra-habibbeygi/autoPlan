import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const ReportingChart = ({ detail }) => {
    const [data, setData] = useState([]);

    const backupData = [
        { name: 'empty', value: 33 },
        { name: 'empty', value: 33 },
        { name: 'empty', value: 33 }
    ];

    useEffect(() => {
        if (detail) {
            setData([]);

            Object.entries(detail)?.map(([title, percent]) => {
                title !== 'link' && setData(prev => [...prev, { name: title, value: percent }]);
            });
        }
    }, [detail]);

    const colors = ['#1c1c1c', '#baedbd', '#c6c7f8', '#95a4fc'];

    return (
        <PieChart width={150} height={200}>
            <Pie data={data.length ? data : backupData} innerRadius={55} outerRadius={75} dataKey='value'>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
            </Pie>
        </PieChart>
    );
};

export default ReportingChart;
