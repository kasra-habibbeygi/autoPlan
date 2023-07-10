import React from 'react';

//Assets
import { ChartItemWrapper } from './chart-item.style';

//Components

const ChartItem = ({ title, percent, color }) => {
    return (
        <ChartItemWrapper color={color}>
            <div>
                <span className='circle'></span>
                <p>{title}</p>
            </div>
            <p className='percent'>
                {percent && '٪'} {percent}
            </p>
        </ChartItemWrapper>
    );
};

export default ChartItem;
