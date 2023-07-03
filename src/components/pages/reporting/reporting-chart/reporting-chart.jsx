import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ReportingChart = () => {
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 }
    ];

    const colors = ['#1c1c1c', '#baedbd', '#c6c7f8', '#95a4fc'];

    return (
        <ResponsiveContainer width={'100%'} height={200}>
            <PieChart>
                <Pie data={data} innerRadius={55} outerRadius={75} dataKey='value'>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ReportingChart;
