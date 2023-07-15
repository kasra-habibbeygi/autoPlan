import styled from '@emotion/styled';

export const Style = styled.div(props => ({
    width: '500px',
    margin: '50px auto',

    '@media(max-width : 700px)': {
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
            color: '#830000'
        }
    },

    '& .text_area_error': {
        div: {
            border: '1px solid #830000'
        }
    }
}));
