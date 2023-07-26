import React from 'react';
import InputComponent from './input-component';

//Assets
import { TimePickerStyle } from './TimePickerStyle';

const TimePicker = ({ title, hourDetail, minDetail, disabled = false }) => {
    return (
        <TimePickerStyle>
            <p>{title}</p>
            <div className='timePicker'>
                <InputComponent type='text' placeHolder='ساعت' maxLength={2} detail={hourDetail} disabled={disabled} />
                <span>:</span>
                <InputComponent type='text' maxLength={2} placeHolder='دقیقه' detail={minDetail} disabled={disabled} />
            </div>
        </TimePickerStyle>
    );
};

export default TimePicker;
