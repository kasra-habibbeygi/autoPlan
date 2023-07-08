import styled from '@emotion/styled';

export const QualificationWrapper = styled.div(props => ({
    '& .formControl': {
        margin: '0 auto',
        width: 'fit-content',
        backgroundColor: props.theme.colors.white,
        padding: '20px 50px',
        borderRadius: '12px'
    },

    form: {
        marginTop: '30px'
    }
}));
