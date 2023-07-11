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

        '& .questions': {
            display: 'flex',
            gap: '5px',
            marginTop: '10px',

            '& .quest': {
                fontWeight: 700,
                whiteSpace: 'nowrap'
            },

            '& .answer': {}
        }
    }
}));
