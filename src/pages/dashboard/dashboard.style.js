import styled from '@emotion/styled';

export const HomeWrapper = styled.div(props => ({
    marginTop: '10px',

    '& .item': {
        backgroundColor: props.theme.colors.white,
        borderRadius: '18px',
        padding: '50px',
        fontSize: '12px',

        '& .chartWrapper': {
            width: '100%',
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // flexWrap: 'wrap',
            gap: '10px'
        },

        '& .chartItems': {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        },

        '& .mainChart': {
            width: '100%'
        }
    },

    '& .itemMore': {
        backgroundColor: props.theme.colors.white,
        borderRadius: '18px',
        padding: '23px',
        fontSize: '12px',
        marginTop: '10px'
    }
}));
