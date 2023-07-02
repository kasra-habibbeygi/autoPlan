import styled from '@emotion/styled';

export const LayoutProviderStyle = styled.div({
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    margin: '0px auto',
    padding: '50px 0px',
    '& .content': {
        // marginRight: '360px',
        direction: 'rtl',
        flexGrow: 1
    }
});
