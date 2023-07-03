import styled from '@emotion/styled';

export const ReportingWrapper = styled.div(props => ({
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
    }
}));
