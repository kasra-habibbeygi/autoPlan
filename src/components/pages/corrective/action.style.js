import styled from '@emotion/styled';

export const ActionStyle = styled.div(props => ({
    width: '500px',
    margin: '50px auto',

    '@media(max-width : 700px)': {
        width: '100%'
    },

    '& .input_group': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    '& .inputField': {
        width: '100%',
        display: 'flex',
        alignItems: 'end',
        gap: '10px'
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
