import styled from '@emotion/styled';

export const MainField = styled.div(() => ({
    '& .modal_content_field': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '40px 50px',
        gap: '20px'
    },

    '& .button_group': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: '10px',

        button: {
            height: '48px'
        }
    },

    '& .MuiPaper-elevation': {
        borderRadius: '20px'
    },

    h3: {
        fontSize: '1.3rem',
        marginBottom: '20px'
    }
}));
