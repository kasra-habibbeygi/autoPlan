import styled from '@emotion/styled';

export const QualificationWrapper = styled.div(props => ({
    '& .formControl': {
        margin: '0 auto',
        backgroundColor: props.theme.colors.white,
        padding: '20px 50px',
        borderRadius: '12px',
        width: '600px',

        '@media(max-width : 700px)': {
            width: '100%',
            padding: '20px 30px'
        }
    },

    form: {
        marginTop: '30px',

        '& .date_wrapper': {
            maxWidth: '442px'
        }
    },

    '& .filter_field': {
        backgroundColor: 'white',
        padding: '23px',
        borderRadius: '15px',
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        button: {
            width: 'max-content',
            height: '40px',
            padding: '0 10px'
        }
    },

    '@media(max-width : 700px)': {
        '& .filter_field': {
            backgroundColor: 'white',
            padding: '23px',
            borderRadius: '15px',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
            gap: '20px',

            label: {
                margin: '0'
            }
        }
    }
}));
