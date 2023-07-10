import styled from '@emotion/styled';

export const FormWrapper = styled.div(props => ({
    '& .title': {
        fontWeight: 1000,
        fontSize: '31px',
        textAlign: 'center'
    },

    form: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },

    '& .time': {
        '& p:first-child': {
            fontSize: '14px',
            fontWeight: 700,
            marginBottom: '10px'
        },

        '& .error': {
            border: '1px solid #830000',
            borderRadius: '8px'
        },

        '& .time_picker': {
            '& *': {
                border: 'none'
            },
            background: props.theme.colors.white,
            boxShadow: '0px 4px 14px 0px #0000000D',
            padding: '0 20px',
            borderRadius: '8px'
        },

        '& .time_error': {
            fontSize: '12px',
            color: '#830000',
            marginTop: '15px'
        }
    }
}));
