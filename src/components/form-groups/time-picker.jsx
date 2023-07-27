import React from 'react';
import InputComponent from './input-component';

//Assets
import { TimePickerStyle } from './TimePickerStyle';

const TimePicker = ({ title, hourDetail, minDetail, disabled = false, error }) => {
    return (
        <TimePickerStyle error={error}>
            <p>{title}</p>
            <div className='timePicker'>
                <InputComponent type='number' placeHolder='ساعت' maxLength={2} detail={hourDetail} disabled={disabled} />
                <span>:</span>
                <InputComponent type='number' maxLength={2} placeHolder='دقیقه' detail={minDetail} disabled={disabled} />
            </div>
            {error && <p className='error'>{error}</p>}
        </TimePickerStyle>
    );
};

export default TimePicker;
