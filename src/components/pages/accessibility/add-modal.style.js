import styled from '@emotion/styled';

export const AddModalWrapper = styled.div(props => ({
    width: '412px',
    margin: '0 auto',

    '& .MuiChip-deleteIcon': {
        margin: '0 5px 0 10px !important'
    },

    '@media(max-width : 800px)': {
        width: '100%'
    },

    h3: {
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: '900'
    },

    form: {
        marginTop: '50px',

        '& .auto_complete_wrapper': {
            '& .auto_complete': {
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                background: props.theme.colors.white,
                boxShadow: '0px 4px 14px 0px #0000000D',
                padding: '0 20px',
                borderRadius: '8px',
                ...(props.error && {
                    border: '1px solid #830000'
                }),

                '& *': {
                    border: 'none',
                    fontFamily: 'main !important'
                },

                button: {
                    marginTop: '0 !important',
                    width: 'auto '
                }
            },

            '& .auto_complete_title': {
                fontWeight: 600
            },

            '& .auto_complete_error': {
                color: '#830000',
                fontSize: '12px',
                marginTop: '10px'
            }
        },

        '& .checkbox_wrapper': {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '30px 0',

            p: {
                fontWeight: 700
            },

            input: {
                width: '15px',
                height: '15px'
            }
        }
    },

    '& .loading': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.theme.colors.white,
        padding: '50px 0',
        borderRadius: '18px',
        margin: '10px 0'
    }
}));
