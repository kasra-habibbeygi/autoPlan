import styled from '@emotion/styled';

export const DatePickerWrapper = styled.div(props => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '10px',

    p: {
        fontWeight: 600,
        ...(props.error && {
            color: '#830000'
        })
    },

    '& .container': {
        background: props.theme.colors.white,
        boxShadow: '0px 4px 14px 0px #0000000D',
        borderRadius: '8px',

        '& *': {
            border: 'none'
        },

        '& .MuiStack-root': {
            paddingTop: '0'
        },

        ...(props.error && {
            border: '1px solid #830000'
        })
    },

    '& .error': {
        fontSize: '12px',
        color: '#830000'
    }
}));
