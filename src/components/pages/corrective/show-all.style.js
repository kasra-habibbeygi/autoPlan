import styled from '@emotion/styled';

export const ShowAllStyle = styled.div(props => ({
    h2: {
        color: props.theme.colors.mainColor
    },

    '& .container': {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',

        '& .item': {},

        '& .title': {
            color: props.theme.colors.mainColor,
            fontWeight: 600,
            fontSize: '21px'
        },

        '& .text': {
            marginTop: '10px',
            span: {
                marginLeft: '30px'
            }
        },

        '& .text_date': {
            display: 'flex'
        },

        '& .questions': {
            display: 'flex',
            gap: '5px',
            marginTop: '20px',

            '& .quest': {
                fontWeight: 700,
                whiteSpace: 'nowrap'
            },

            '& .answers_wrapper': {
                display: 'flex',
                flexDirection: 'column',

                '& .answer': {}
            }
        }
    }
}));
