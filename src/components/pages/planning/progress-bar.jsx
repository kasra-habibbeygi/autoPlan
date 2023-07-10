import React from 'react';

//Assets
import { ProgressBarStyle } from './progress-bar.style';

const ProgressBar = ({ step }) => {
    return (
        <ProgressBarStyle>
            <div className={`progress ${step >= 1 ? 'active' : ''}`}>
                <p>مشخصات خودرو</p>
                <span className='number'>1</span>
            </div>
            <span className={`divider ${step >= 2 ? 'active' : ''}`}></span>

            <div className={`progress ${step >= 2 ? 'active' : ''}`}>
                <p>عیب‌ یابی</p>
                <span className='number'>2</span>
            </div>
            <span className={`divider ${step >= 3 ? 'active' : ''}`}></span>

            <div className={`progress ${step >= 3 ? 'active' : ''}`}>
                <p>زمان</p>
                <span className='number'>3</span>
            </div>
        </ProgressBarStyle>
    );
};

export default ProgressBar;
