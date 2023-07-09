import styled from '@emotion/styled';

export const Style = styled.div(props => ({
    width: '500px',
    margin: '50px auto',

    '& .MuiButtonBase-root': {
        '&:hover': {
            background: '#1976d2'
        }
    },

    '& .inputField': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',

        '& .add': {
            marginTop: '20px',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
            borderRadius: '50%',
            background: props.theme.colors.white,
            cursor: 'pointer'
        }
    }
}));
