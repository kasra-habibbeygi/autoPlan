import styled from '@emotion/styled';

export const PercentWrapper = styled.div(props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    color: props.theme.colors.mainColor
}));

export const ModalStyleBg = styled.div(props => ({
    background: '#FAFAFA',
    padding: '50px',
    borderRadius: '20px'
}));
