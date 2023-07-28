import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

//Assets

//Components

const ReportingChart = ({ detail }) => {
    const data = [];

    Object.entries(detail)?.map(([title, percent]) => {
        title !== 'link' && data.push({ name: title, value: percent });
    });

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
