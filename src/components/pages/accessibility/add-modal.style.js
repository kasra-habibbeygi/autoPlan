import styled from '@emotion/styled';

export const AddModalWrapper = styled.div(() => ({
    width: '412px',
    margin: '0 auto',

    '@media(max-width : 700px)': {
        width: '100%'
    },

    h3: {
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: '900'
    },

    form: {
        marginTop: '50px'
    }
}));
