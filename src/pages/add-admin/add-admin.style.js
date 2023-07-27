import styled from '@emotion/styled';

export const AddAdminWrapper = styled.div(props => ({
    '& .formControl': {
        margin: '0 auto',
        backgroundColor: props.theme.colors.white,
        padding: '20px 70px',
        borderRadius: '12px',
        width: '600px',

        '@media(max-width : 800px)': {
            width: '100%',
            padding: '20px 30px'
        }
    },

    '& .truncate_field': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '300px',
        margin: '0 auto'
    },

    form: {
        marginTop: '30px',

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

                ...(props.textareaError && {
                    borderRadius: '12px',
                    border: '1px solid #830000'
                }),

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
        }
    }
}));
