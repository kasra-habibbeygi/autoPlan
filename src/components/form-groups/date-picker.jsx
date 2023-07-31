import React from 'react';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

//Assets
import { DatePickerWrapper } from './date-picker.style';

//Components

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin]
});

const DatePickerComponent = ({ value, onChange, title, error, disabled = false, minDate }) => {
    return (
        <DatePickerWrapper error={error}>
            {title && <p>{title}</p>}
            <div className='container'>
                <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                    <CacheProvider value={cacheRtl}>
                        <DatePicker
                            value={value?.valueOf()}
                            onChange={newValue => onChange(newValue?.valueOf())}
                            sx={{ width: '100%' }}
                            format='yyyy/MM/dd'
                            disabled={disabled}
                            minDate={minDate}
                        />
                    </CacheProvider>
                </LocalizationProvider>
            </div>
            {error && <span className='error'>{error?.message}</span>}
        </DatePickerWrapper>
    );
};

export default DatePickerComponent;
