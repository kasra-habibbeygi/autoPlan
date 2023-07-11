import styled from '@emotion/styled';

export const InputWrapper = styled.div(props => ({
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
        display: 'flex',
        alignItems: 'center',
        background: props.theme.colors.white,
        boxShadow: '0px 4px 14px 0px #0000000D',
        padding: '15px 20px',
        borderRadius: '8px',
        ...(props.error && {
            border: '1px solid #830000'
        }),

        input: {
            color: props.theme.colors.textColor,
            width: '100%',
            border: 'none',
            outline: 'none',
            padding: '0 10px',
            fontSize: '16px',

            '&[type=number]': {
                '::-webkit-outer-spin-button, ::-webkit-inner-spin-button': {
                    margin: 0,
                    WebkitAppearance: 'none'
                }
            }
        },

        img: {
            width: 'auto',
            maxWidth: '100%'
        }
    },

    '& .error': {
        fontSize: '12px',
        color: '#830000'
    }
}));
