import styled from '@emotion/styled';

export const PlanningField = styled.div(props => ({
    '& .formControl': {
        margin: '0 auto',
        width: '1000px',
        backgroundColor: props.theme.colors.white,
        padding: '50px 60px',
        borderRadius: '12px'
    },

    form: {
        marginTop: '30px',
        margin: '20px auto',
        width: '400px'
    },

    '& .form_double_col': {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',

        '& .col': {
            width: '50%',
            padding: '0 20px'
        },

        '& .submit': {
            width: '400px',
            margin: '0 auto !important'
        }
    },

    '& .summary': {
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: '1px dashed #c8c8c8',
        display: 'flex',
        gap: '40px',

        '& .right_field': {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',

            '& .pill': {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '50%',
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
