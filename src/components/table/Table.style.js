import styled from '@emotion/styled';

export const TableComponent = styled.div(props => ({
    table: {
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
            padding: '23px',
            fontSize: '20px'
        },

        '& td:first-of-type , th:first-of-type': {
            borderTopRightRadius: '18px',
            borderBottomRightRadius: '18px'
        },

        '& td:last-child , th:last-child': {
            borderTopLeftRadius: '18px',
            borderBottomLeftRadius: '18px'
        }
    },

    '& .paginationWrapper': {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',

        '& *': {
            direction: 'ltr !important'
        }
    }
}));
