import React, { useState } from 'react';

//Assets
import { ProgressBarStyle } from './progress-bar.style';

const ProgressBar = ({ step }) => {
    return (
        <ProgressBarStyle>
            <div className={`progress ${step >= 1 ? 'active' : ''}`}>
                <p>مشکل</p>
                <span className='number'>1</span>
            </div>
            <span className={`divider ${step >= 2 ? 'active' : ''}`}></span>

            <div className={`progress ${step >= 2 ? 'active' : ''}`}>
                <p>ریشه یابی</p>
                <span className='number'>2</span>
            </div>
            <span className={`divider ${step >= 3 ? 'active' : ''}`}></span>

            <div className={`progress ${step >= 3 ? 'active' : ''}`}>
                <p>اقدام</p>
                <span className='number'>3</span>
            </div>
            <span className={`divider ${step >= 4 ? 'active' : ''}`}></span>

            <div className={`progress ${step >= 4 ? 'active' : ''}`}>
                <p>مسئول اقدام</p>
                <span className='number'>4</span>
            </div>
            <span className={`divider ${step >= 5 ? 'active' : ''}`}></span>

            <div className={`progress ${step >= 5 ? 'active' : ''}`}>
                <p>تاریخ اجرا</p>
                <span className='number'>5</span>
            </div>
            <span className={`divider ${step >= 6 ? 'active' : ''}`}></span>

            <div className={`progress ${step >= 6 ? 'active' : ''}`}>
                <p>نتیجه</p>
                <span className='number'>6</span>
            </div>
            <span className={`divider ${step >= 7 ? 'active' : ''}`}></span>

            <div className={`progress ${step >= 7 ? 'active' : ''}`}>
                <p>اثربخشی</p>
                <span className='number'>7</span>
            </div>
        </ProgressBarStyle>
    );
};

export default ProgressBar;
