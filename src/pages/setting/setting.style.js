import styled from '@emotion/styled';

export const SettingWrapper = styled.div(props => ({
    marginTop: '10px',

    '& .item': {
        backgroundColor: props.theme.colors.white,
        borderRadius: '18px',
        padding: '40px 50px'
    }
}));
