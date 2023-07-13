import styled from '@emotion/styled';

export const PlanningField = styled.div(props => ({
    '& .formControl': {
        margin: '0 auto',
        backgroundColor: props.theme.colors.white,
        padding: '50px 60px',
        borderRadius: '12px',

        '@media(max-width : 700px)': {
            padding: '50px 30px'
        }
    },

    form: {
        marginTop: '30px',
        margin: '20px auto'
    },

    '& .form_double_col': {
        '& .submit': {
            width: '400px',
            margin: '0 auto !important',

            '@media(max-width : 720px)': {
                width: '100%'
            }
        }
    },

    '& .summary': {
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: '1px dashed #c8c8c8',

        '& .right_field': {
            width: '100%',

            '& .pill': {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '20px',

                img: {
                    width: '30px',
                    marginLeft: '10px'
                },

                div: {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.8rem'
                },

                p: {
                    color: '#174787',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                }
            }
        },

        '& .left_field': {
            width: '100%'
        }
    }
}));
