/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart } from 'recharts';

//Assets
import { LineChartWrapper } from './line-chart.style';

//Components

const ReportingLineChart = ({ detail }) => {
    let data = [];

    useEffect(() => {
        if (detail) {
            data = [];

            Object.entries(detail)?.map(([title, percent]) => {
                title !== 'link' && data.push({ name: `${title} ماه گذشته`, pv: percent });
            });
        }
    }, [detail]);

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
