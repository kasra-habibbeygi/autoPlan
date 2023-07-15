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
    }
}));

export const ModalStyleBg = styled.div(props => ({
    background: '#FAFAFA',
    padding: '50px',
    borderRadius: '20px'
}));
