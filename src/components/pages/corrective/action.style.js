import styled from '@emotion/styled';

export const ActionStyle = styled.div(props => ({
    width: '500px',
    margin: '50px auto',
    '& .input_group': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '0 !important'
    },

    '& .inputField': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '0 !important'
    },

    '& .add': {
        marginBottom: '0 !important',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        borderRadius: '50%',
        background: props.theme.colors.white,
        cursor: 'pointer'
    }
}));
