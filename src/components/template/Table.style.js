import styled from '@emotion/styled';

export const TableComponent = styled.div(({ theme }) => ({
    maxWidth: '100%',
    overflow: 'auto',
    table: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',

        tr: {
            backgroundColor: theme.colors.white,
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

    '& .loading': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: '50px 0',
        borderRadius: '18px',
        margin: '10px 0'
    },

    '& .empty': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: theme.colors.white,
        padding: '30px 0',
        borderRadius: '18px',
        margin: '10px 0',
        fontWeight: 700,
        img: {
            width: '40px',
            height: '40px'
        }
    },

    '& .tooltip': {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '13px 20px',
        backgroundColor: 'white',
        width: '307px',
        height: '80px',
        borderRadius: '4px',
        border: '2px solid #5EA3FF',

        div: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',

            '& .title': {
                fontWeight: 900,
                color: theme.colors.mainColor
            },

            '& .text': {
                fontSize: '11px'
            }
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
        fontSize: '1rem'
    },

    '& *': {
        direction: 'ltr !important'
    }
}));
