import styled from '@emotion/styled';

export const Style = styled.div(props => ({
    width: '500px',
    margin: '50px auto',

    '& .MuiButtonBase-root': {
        '&:hover': {
            background: '#1976d2'
        }
    }
}));
