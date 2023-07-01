import styled from '@emotion/styled';

export const LayoutProdiverStyle = styled.div(props => ({
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px auto',
    padding: '50px 0px',
    '& .content': {
        width: 'calc(100% - 360px)',
        marginRight: '360px',
        direction: 'rtl'
    },

}));
