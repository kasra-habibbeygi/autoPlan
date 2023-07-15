import styled from '@emotion/styled';

export const FormWrapper = styled.form(props => {
    return {
        '& *': {
            fontFamily: 'main !important'
        },

        padding: '0 45px',

        '@media(max-width : 700px)': {
            padding: '0'
        },

        '& .auto_error': {
            fontSize: '12px',
            color: '#830000',
            marginTop: '15px'
        },

        '& .auto_complete': {
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
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

        '& .radios': {
            display: 'flex',
            gap: '70px',
            marginTop: '40px',

            div: {
                display: 'flex',
                gap: '10px',

                input: {
                    width: '17px'
                }
            }
        },

        '& .work_hour': {
            display: 'flex',
            justifyContent: 'space-between',
            background: props.theme.colors.white,
            boxShadow: '0px 4px 14px 0px #0000000D',
            padding: '15px 20px',
            borderRadius: '8px',
            fontSize: '12px',

            div: {
                display: 'flex',
                alignItems: 'center'
            },

            '& .input_wrapper': {
                display: 'flex',
                alignItems: 'center',
                gap: '5px',

                '@media(max-width : 600px)': {
                    gap: '0'
                },

                input: {
                    width: '35px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '20px',
                    fontWeight: 700,
                    textAlign: 'center',

                    '@media(max-width : 600px)': {
                        width: '30px'
                    }
                }
            }
        }
    };
});
