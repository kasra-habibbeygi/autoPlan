import styled from '@emotion/styled';

export const FilterModalWrapper = styled.div(props => ({
    '& .header': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        fontWeight: 900,
        fontSize: '18px',
        marginBottom: '40px'
    },

    '& .filter_btn': {
        justifyContent: 'space-between',
        color: 'black',
        fontWeight: 700,
        padding: '20px 10px',
        borderBottom: '1px solid #F0EFEF'
    },

    '& .auto_complete_wrapper': {
        '& .auto_complete': {
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            background: props.theme.colors.white,
            boxShadow: '0px 4px 14px 0px #0000000D',
            padding: '0 20px',
            borderRadius: '8px',
            ...(props.error && {
                border: '1px solid #830000'
            }),

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
        },

        '& .auto_complete_error': {
            color: '#830000',
            fontSize: '12px',
            border: 'none !important',
            marginTop: '10px'
        }
    }
}));
