import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

//Assets

//Components

const DeficiencyChart = () => {
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 }
    ];

    const colors = ['#ad9bfd', '#f8c75b', '#8bf795', '#e8f6fd'];

    return (
        <PieChart width={170} height={200}>
            <Pie data={data} innerRadius={50} outerRadius={80} dataKey='value'>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
            </Pie>
        </PieChart>
    );
};

export default DeficiencyChart;
