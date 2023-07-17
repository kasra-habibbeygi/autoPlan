import styled from '@emotion/styled';

export const LoginStyle = styled.nav(props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    width: '420px',
    height: '500px',
    flexDirection: 'column',

    '@media(max-width : 600px)': {
        width: '280px'
    },

    '& .shapeTop': {
        position: 'absolute',
        top: 0,
        right: 0
    },

    '& .shapeBottom': {
        position: 'absolute',
        bottom: 0,
        left: 0,
        transform: 'rotate(180deg)'
    },

    '& .title': {
        color: props.theme.colors.mainColor
    },

    '& .text': {
        textAlign: 'justify',
        margin: '40px 0'
    },

    '& .secondStep': {
        '& .verificationText': {
            margin: '20px 0',
            color: props.theme.colors.mainColor,
            fontWeight: 600,
            fontSize: '14px'
        },

        '& .codeInput': {
            display: 'flex',
            justifyContent: 'center',

            '& *': {
                direction: 'ltr !important'
            },

            '& .container': {
                flexGrow: '1',
                height: '56px'
            },

            '& .character': {
                borderRadius: '8px',
                boxShadow: '0px 4px 14px 0px #00000014',
                backgroundColor: props.theme.colors.white,
                border: 'none'
            }
        }
    }
}));
