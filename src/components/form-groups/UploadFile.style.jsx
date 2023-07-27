import styled from '@emotion/styled';

export const UploadFileStyle = styled.form(props => ({
    '& .upload': {
        color: '#727A89',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        padding: '30px 10px',
        border: '1px dashed gray',
        ...(props.error && {
            borderColor: '#830000'
        }),

        p: {
            overflow: 'hidden',
            width: '300px',
            direction: 'ltr',
            fontSize: '0.9rem'
        }
    },
    '& .content': {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        textAlign: 'justify',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',

        '@media(max-width : 800px)': {
            flexDirection: 'column',
            textAlign: 'center'
        },

        img: {
            background: props.theme.colors.white,
            padding: '20px',
            borderRadius: '20px'
        },
        h3: {
            fontSize: '1rem',
            color: props.theme.colors.black,
            marginBottom: '20px'
        }
    },

    '& .error_message': {
        fontSize: '12px',
        color: '#830000',
        margin: '10px 0 20px 0'
    }
}));
