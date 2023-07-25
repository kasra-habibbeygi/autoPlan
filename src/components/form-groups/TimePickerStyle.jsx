import styled from '@emotion/styled';

export const TimePickerStyle = styled.div(props => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',

    p: {
        fontWeight: '600'
    },

    '& .timePicker': {
        display: 'flex',
        flexDirection: 'row-reverse',
        gap: '20px',
        alignItems: 'center'
    }
}));
