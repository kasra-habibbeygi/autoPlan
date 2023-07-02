import styled from '@emotion/styled';

export const PagesHeaderStyle = styled.div(props => ({
    display: 'flex',
    gap: '10px',
    width: '100%',

    '& > p , & .addButton': {
        borderRadius: '18px',
        backgroundColor: props.theme.colors.white,
        padding: '23px',
        fontSize: '15px',
        flexGrow: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap'
    },

    '& .addButton': {
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
        alignItems: 'center'
    }
}));
