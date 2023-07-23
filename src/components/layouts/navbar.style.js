import styled from '@emotion/styled';

export const NavbarStyle = styled.nav(props => ({
    width: '100%',
    height: '85px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 250px',
    alignItems: 'center',
    background: props.theme.colors.white,

    '@media(max-width : 1200px)': {
        padding: '20px 70px'
    },

    '& .rightItems': {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',

        button: {
            img: {
                width: '35px',
                height: '35px'
            }
        }
    },

    '& .hamburgerMenu_icon': {
        width: '30px',
        height: '30px'
    },

    '& .logoHeader': {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',

        '& .logoStyle': {
            width: '45px',
            height: '45px'
        },

        h2: {
            fontSize: '1.3rem',
            color: props.theme.colors.mainColor
        }
    },

    '& .dashboard_btn': {
        color: props.theme.colors.textColor,

        '&:hover': {
            color: props.theme.colors.mainColor
        }
    },

    '& .menuList': {
        display: 'flex',
        alignItems: 'center',
        gap: '68px',

        '@media(max-width : 1320px)': {
            gap: '30px'
        },

        li: {
            listStyleType: 'none',
            fontSize: '1.1rem',
            a: {
                color: props.theme.colors.textColor,

                '&:hover': {
                    color: props.theme.colors.mainColor
                }
            },
            '& .active': {
                color: props.theme.colors.mainColor
            }
        }
    },
    '& .login': {
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        color: props.theme.colors.blue
    }
}));
