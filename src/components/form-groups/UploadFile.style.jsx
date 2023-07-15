import styled from '@emotion/styled';

export const UploadFileStyle = styled.div(props => ({
    '& .upload': {
        color: '#727A89',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        padding: '30px 10px',
        border: '1px dashed gray',

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

        '@media(max-width : 700px)': {
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
    }
}));
