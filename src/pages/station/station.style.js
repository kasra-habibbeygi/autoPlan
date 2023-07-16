import styled from '@emotion/styled';

export const StationWrapper = styled.div(props => ({
    '& .formControl': {
        margin: '0 auto',
        backgroundColor: props.theme.colors.white,
        padding: '20px 50px',
        borderRadius: '12px',
        width: '600px',

        '@media(max-width : 700px)': {
            width: '100%',
            padding: '20px 30px'
        },

        '& .radios': {
            marginTop: '30px',

            '& .title': {
                fontWeight: 700,
                marginBottom: '5px'
            },
            '& .error': {
                fontSize: '12px',
                color: '#830000'
            }
        },

        '& .auto_complete_wrapper': {
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

            '& .auto_complete_title': {
                fontWeight: 600
            },

            '& .auto_complete_error': {
                color: '#830000',
                fontSize: '12px'
            }
        }
    },

    form: {
        marginTop: '30px'
    }
}));
