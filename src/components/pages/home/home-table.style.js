import styled from '@emotion/styled';

export const TableWrapper = styled.div({
    marginTop: '40px',
    overflow: 'auto',

    table: {
        width: '100%',
        fontSize: '16px',

        '& td ,th': {
            padding: '10px'
        },

        '& td,th': {
            whiteSpace: 'nowrap'
        }
    }
});
