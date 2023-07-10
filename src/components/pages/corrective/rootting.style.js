import styled from '@emotion/styled';

export const RootingStyle = styled.div(props => ({
    margin: '50px',

    '& .wrapper': {
        overflow: 'auto'
    },

    '& .input_group': {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },

    '& .inputField': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '412px',
        minWidth: '412px'
    },

    '& .add': {
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
