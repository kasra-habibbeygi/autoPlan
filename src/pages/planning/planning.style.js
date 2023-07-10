import styled from '@emotion/styled';

export const PlanningField = styled.div(props => ({
    '& .formControl': {
        margin: '0 auto',
        width: '1000px',
        backgroundColor: props.theme.colors.white,
        padding: '20px 50px',
        borderRadius: '12px'
    },

    form: {
        marginTop: '30px',
        margin: '20px auto',
        width: '400px'
    }
}));
