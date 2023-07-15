import styled from '@emotion/styled';

export const MobileAlertWrapper = styled.div(() => ({
    textAlign: 'center',
    fontWeight: 700,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    marginTop: '100px',

    '& *': {
        fontFamily: 'main !important',
        fontSize: '18px !important'
    }
}));
