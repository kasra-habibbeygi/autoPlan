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

    '& .table_wrapper': {
        '& .table_header': {
            marginTop: '20px',
            backgroundColor: 'white',
            borderRadius: '18px',
            padding: '15px 23px',
            fontSize: '22px',
            fontWeight: 700,
            textAlign: 'center'
        }
    }
}));

export const ModalStyleBg = styled.div(() => ({
    background: '#FAFAFA',
    padding: '50px',
    borderRadius: '20px'
}));
