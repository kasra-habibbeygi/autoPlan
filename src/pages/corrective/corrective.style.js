import styled from '@emotion/styled';

export const PercentWrapper = styled.div(props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    color: props.theme.colors.mainColor
}));
