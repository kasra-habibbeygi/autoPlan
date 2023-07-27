import styled from '@emotion/styled';

export const TimePickerStyle = styled.div(props => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',

    p: {
        fontWeight: '600',
        ...(props.error && {
            color: '#830000'
        })
    },

    '& .timePicker': {
        display: 'flex',
        flexDirection: 'row-reverse',
        gap: '20px',
        alignItems: 'center',
        ...(props.error && {
            border: '1px solid #830000',
            borderRadius: '8px'
        })
    },

    '& .error': {
        fontWeight: '400',
        fontSize: '12px',
        color: '#830000'
    }
}));
