import styled from '@emotion/styled';

export const FormWrapper = styled.div(() => ({
    '& .title': {
        fontWeight: 1000,
        fontSize: '31px',
        textAlign: 'center'
    },

    form: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    }
}));
