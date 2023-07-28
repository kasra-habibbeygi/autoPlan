import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ReportingBarChart = ({ detail }) => {
    const data = [];

    Object.entries(detail)?.map(([title, value]) => {
        title !== 'link' &&
            data.push({
                name: title,
                delay_end: value?.delay_end,
                delay_start: value?.delay_start,
                rush_end: value?.rush_end,
                rush_start: value?.rush_start
            });
    });

    return (
        <ResponsiveContainer width='100%' height={200}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeLinecap='1' vertical={false} stroke='#f2f2f2' />
                <XAxis dataKey='name' tickLine={false} />
                <YAxis tick={{ dy: -5, dx: -40 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey='delay_end' fill='#95A4FC' />
                <Bar dataKey='delay_start' fill='#174787' />
                <Bar dataKey='rush_end' fill='#E8E8E8' />
                <Bar dataKey='rush_start' fill='#299D91' />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ReportingBarChart;
