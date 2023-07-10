import styled from '@emotion/styled';

export const SidebarStyle = styled.div(props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '302px',
    minWidth: '302px',
    backgroundColor: props.theme.colors.white,
    borderRadius: '18px',
    padding: '24px',

    '& .item': {
        display: 'flex',
        gap: '10px',
        whiteSpace: 'nowrap'
    },

    ul: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },

    li: {
        listStyle: 'none',

        div: {
            padding: '18px 20px',
            borderRadius: '14px',
            color: props.theme.colors.black,
            transition: 'all 0.1s',

            '&:hover': {
                backgroundColor: props.theme.colors.gray
            }
        },

        '& .active': {
            div: {
                backgroundColor: props.theme.colors.gray
            }
        }
    },

    '& .logout': {
        padding: '18px 20px',
        cursor: 'pointer',

        button: {
            flexDirection: 'row-reverse',
            color: props.theme.colors.textDisable,
            backgroundColor: 'transparent'
        }
    }
}));
