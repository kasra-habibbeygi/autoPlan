import styled from '@emotion/styled';

export const TableComponent = styled.table(props => ({
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
    overflow: 'auto',

    tr: {
        backgroundColor: props.theme.colors.white,
        marginBottom: '10px',
        whiteSpace: 'nowrap'
    },

    '& td, th': {
        padding: '23px'
    },

    '& td:first-child , th:first-child': {
        borderTopRightRadius: '18px',
        borderBottomRightRadius: '18px'
    },

    '& td:last-child , th:last-child': {
        borderTopLeftRadius: '18px',
        borderBottomLeftRadius: '18px'
    }
}));
