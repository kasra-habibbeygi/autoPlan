import styled from '@emotion/styled';

export const InputWrapper = styled.div(props => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    p: {
        fontWeight: 600
        // fontSize: '20px'
    },

    '& .container': {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxShadow: '0px 4px 14px 0px #0000000D',
        padding: '15px 20px',
        borderRadius: '8px',
        input: {
            color: props.theme.colors.textColor,
            width: '100%',
            border: 'none',
            outline: 'none',
            padding: '0 10px',
            fontSize: '16px'
        }
    },
    '& .error': {
        fontSize: '12px',
        color: props.theme.colors.error
    }
}));
