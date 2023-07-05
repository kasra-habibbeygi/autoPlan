import React from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart } from 'recharts';

//Assets

//Components
import { LineChartWrapper } from './line-chart.style';

const ReportingLineChart = () => {
    const data = [
        {
            name: 'فروردین',
            pv: 2000
        },
        {
            name: 'اردیبهشت',
            pv: 2700
        },
        {
            name: 'خرداد',
            pv: 5000
        },
        {
            name: 'تیر',
            pv: 3908
        },
        {
            name: 'مرداد',
            pv: 4800
        },
        {
            name: 'شهریور',
            pv: 3800
        }
    ];

    return (
        <LineChartWrapper>
            <ResponsiveContainer width={'100%'} height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeLinecap='1' vertical={false} stroke='#f2f2f2' />
                    <XAxis dataKey='name' tickLine={false} />
                    <YAxis tick={{ dy: -5, dx: -40 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type='bump' dataKey='pv' stroke='#A8C5DA' strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </LineChartWrapper>
    );
};

export default ReportingLineChart;
