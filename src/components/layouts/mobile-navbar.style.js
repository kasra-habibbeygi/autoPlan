import styled from '@emotion/styled';

export const MobileWrapper = styled.div(() => ({
    width: '300px',
    padding: '25px',

    '& .header': {
        height: '20px',
        marginBottom: '40px'
    },

    '& .menuList': {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',

        li: {
            listStyle: 'none',

            a: {
                color: 'black'
            }
        }
    }
}));
