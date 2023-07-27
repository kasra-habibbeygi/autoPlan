import styled from '@emotion/styled';

export const Style = styled.div(props => ({
    width: '500px',
    margin: '50px auto',

    '@media(max-width : 800px)': {
        width: '100%'
    },

    '& .MuiButtonBase-root': {
        '&:hover': {
            background: '#1976d2'
        }
    },

    '& .text_area': {
        '& .title': {
            fontWeight: 600,
            marginBottom: '10px'
        },

        div: {
            display: 'flex',
            alignItems: 'start',
            background: props.theme.colors.white,
            boxShadow: '0px 4px 14px 0px #0000000D',
            padding: '15px 20px',
            borderRadius: '8px',

            textarea: {
                color: props.theme.colors.textColor,
                width: '100%',
                border: 'none',
                outline: 'none',
                padding: '0 10px',
                fontSize: '16px',
                resize: 'vertical'
            }
        },

        '& .error': {
            fontSize: '12px',
            color: '#830000',
            marginTop: '10px'
        }
    },

    '& .text_area_error': {
        div: {
            border: '1px solid #830000'
        }
    },

    '& .auto_error': {
        fontSize: '12px',
        color: '#830000',
        marginTop: '8px',
        marginBottom: '15px'
    },

    '& .auto_title': {
        fontWeight: 700
    },

    '& .auto_complete': {
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
        background: props.theme.colors.white,
        boxShadow: '0px 4px 14px 0px #0000000D',
        padding: '0 20px',
        borderRadius: '8px',

        '& *': {
            border: 'none',
            fontFamily: 'main !important'
        },

        button: {
            marginTop: '0 !important',
            width: 'auto '
        }
    },

    '& .auto_complete_error': {
        border: '1px solid #830000'
    }
}));
