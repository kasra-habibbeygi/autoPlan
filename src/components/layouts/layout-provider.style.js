import styled from '@emotion/styled';

export const LayoutProviderStyle = styled.div(props => ({
    width: '100%',
    minHeight: '100vh',
    padding: '50px 5%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    margin: '0px auto',
    background: `url(${props.bg}) no-repeat center center`,
    backgroundSize: 'cover',
    '& .content': {
        // marginRight: '360px',
        direction: 'rtl',
        flexGrow: 1,
        width: 'calc(100% - 302px)'
    }
}));
