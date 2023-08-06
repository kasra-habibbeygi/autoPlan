import styled from '@emotion/styled';

export const CustomStyleWrapper = styled.form(props => ({
    borderTop: '1px solid black',
    marginTop: '25px',
    paddingTop: '25px',

    '& .auto_complete_wrapper': {
        '& .auto_complete': {
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
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

        '& .auto_complete_title': {
            fontWeight: 600
        }
    }
}));
