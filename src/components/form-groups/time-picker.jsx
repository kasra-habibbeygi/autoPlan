import React from 'react';
import InputComponent from './input-component';

//Assets
import { TimePickerStyle } from './TimePickerStyle';

const TimePicker = ({ title, hourDetail, minDetail }) => {
    return (
        <TimePickerStyle>
            <p>{title}</p>
            <div className='timePicker'>
                <InputComponent type='text' placeHolder='ساعت' maxLength={2} detail={hourDetail} />

                <span>:</span>

                <InputComponent type='text' maxLength={2} placeHolder='دقیقه' detail={minDetail} />
            </div>
        </TimePickerStyle>
    );
};

export default TimePicker;
