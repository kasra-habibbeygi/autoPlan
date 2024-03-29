import React from 'react';

//Assets
import { ProgressBarStyle } from './progress-bar.style';

const ProgressBar = ({ step }) => {
    return (
        <ProgressBarStyle>
            <div className={`progress ${step >= 1 ? 'active' : ''}`}>
                <p>انسانی</p>
                <span className='number'>1</span>
            </div>
            <span className={`divider ${step >= 2 ? 'active' : ''}`}></span>

            <div className={`progress ${step >= 2 ? 'active' : ''}`}>
                <p>پیش نمایش</p>
                <span className='number'>2</span>
            </div>
        </ProgressBarStyle>
    );
};

export default ProgressBar;
