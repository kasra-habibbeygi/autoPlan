import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart } from 'recharts';

//Assets
import { LineChartWrapper } from './line-chart.style';

const ReportingLineChart = ({ detail }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (detail) {
            setData([]);

            Object.entries(detail)?.map(([title, percent]) => {
                title !== 'link' && setData(prev => [...prev, { name: `${title}`, pv: percent }]);
            });
        }
    }, [detail]);

    const hasValue = data?.every(item => item.pv === 0);

    return (
        <>
            {hasValue ? (
                <p className='no_report'>گزارشی موجود نمیباشد</p>
            ) : (
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
            )}
        </>
    );
};

export default ReportingLineChart;
