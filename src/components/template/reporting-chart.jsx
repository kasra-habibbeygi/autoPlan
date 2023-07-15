import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

//Assets

//Components

const ReportingChart = () => {
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 }
    ];

    const colors = ['#1c1c1c', '#baedbd', '#c6c7f8', '#95a4fc'];

    return (
        <PieChart width={150} height={200}>
            <Pie data={data} innerRadius={55} outerRadius={75} dataKey='value'>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
            </Pie>
        </PieChart>
    );
};

export default ReportingChart;
