import styled from '@emotion/styled';

export const HeaderWrapper = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    p: {
        fontSize: '14px',
        fontWeight: 700
    },

    button: {
        fontSize: '12px'
    }
}));
