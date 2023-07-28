import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

//Assets

//Components

const DeficiencyChart = ({ detail }) => {
    const data = [];

    Object.entries(detail)?.map(([title, percent]) => {
        title !== 'link' && data.push({ name: title, value: percent });
    });

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
