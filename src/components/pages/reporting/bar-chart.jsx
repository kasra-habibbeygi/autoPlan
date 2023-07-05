import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ReportingBarChart = () => {
    const data = [
        {
            name: 'مکانیک',
            uv: 4000,
            pv: 2400,
            amt: 2400,
            sbh: 2100
        },
        {
            name: 'جلوبندی',
            uv: 3000,
            pv: 1398,
            amt: 2210,
            sbh: 2110
        },
        {
            name: 'برق',
            uv: 2000,
            pv: 5020,
            amt: 2290,
            sbh: 2190
        },
        {
            name: 'گاز',
            uv: 2780,
            pv: 3908,
            amt: 2000,
            sbh: 2100
        }
    ];

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
                <Bar dataKey='pv' fill='#95A4FC' />
                <Bar dataKey='uv' fill='#174787' />
                <Bar dataKey='uv' fill='#E8E8E8' />
                <Bar dataKey='uv' fill='#299D91' />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ReportingBarChart;
