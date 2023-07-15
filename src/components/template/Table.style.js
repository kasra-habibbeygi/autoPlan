import styled from '@emotion/styled';

export const TableComponent = styled.div(props => ({
    maxWidth: '100%',
    overflow: 'auto',

    table: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',

        tr: {
            backgroundColor: props.theme.colors.white,
            marginBottom: '10px',
            whiteSpace: 'nowrap'
        },

        '& td, th': {
            padding: '23px',
            fontSize: '1rem'
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
        marginTop: '20px',

        '& *': {
            direction: 'ltr !important'
        }
    }
}));

export const PaginationWrapper = styled.div(props => ({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '20px',

    '& .MuiSvgIcon-root': {
        color: props.theme.colors.white,
        fontSize: '1.5rem'
    },

    '& .MuiPaginationItem-page': {
        background: `${props.theme.colors.white} !important`,
        color: `${props.theme.colors.textColor}  !important`,
        fontSize: '1.3rem'
    },

    '& *': {
        direction: 'ltr !important'
    }
}));
