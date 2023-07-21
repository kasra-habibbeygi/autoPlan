import styled from '@emotion/styled';

export const AccessibilityWrapper = styled.div(() => ({
    '& .button_wrapper': {
        display: 'flex',
        gap: '10px',
        height: '62px',

        '@media(max-width : 700px)': {
            flexDirection: 'column',
            height: '124px'
        }
    },

    '& .header': {
        marginTop: '10px',
        backgroundColor: 'white',
        borderRadius: '18px',
        padding: '15px 23px',
        fontSize: '22px',
        fontWeight: 700,
        textAlign: 'center'
    },

    '& .tabs_wrapper': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
        backgroundColor: 'white',
        borderRadius: '18px',
        padding: '15px 23px'
    },

    '& .truncate_cell': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '400px',
        margin: '0 auto'
    }
}));

export const ModalStyleBg = styled.div(() => ({
    background: '#FAFAFA',
    padding: '50px',
    borderRadius: '20px'
}));
