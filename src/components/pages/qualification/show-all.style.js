import styled from '@emotion/styled';

export const ShowWrapper = styled.div(props => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    marginTop: '25px',

    '& .wrapper': {
        '& .header': {
            color: props.theme.colors.mainColor,
            fontWeight: 600,
            fontSize: '21px'
        },

        '& .item': {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '10px',
            p: {
                backgroundColor: '#F0EFEF',
                padding: '10px',
                borderRadius: '10px',
                fontSize: '14px'
            }
        }
    }
}));
