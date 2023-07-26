import styled from '@emotion/styled';

export const ReportingWrapper = styled.div(props => ({
    '& .item': {
        '& .barchart_header': {
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            margin: '20px 0 30px 0',

            select: {
                border: 'none',
                outline: 'none',
                fontFamily: 'main'
            }
        },

        '& .barchart_items': {
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            gap: '8px',
            flexWrap: 'wrap',

            '& .first': {
                backgroundColor: '#E8E8E8'
            },

            '& .second': {
                backgroundColor: '#299D91'
            },

            '& .third': {
                backgroundColor: '#95A4FC'
            },

            '& .foutrh': {
                backgroundColor: '#174787'
            },

            div: {
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                gap: '4px'
            },

            span: {
                display: 'block',
                width: '10px',
                height: '5px',
                borderRadius: '2px'
            }
        },

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
            flexWrap: 'wrap',
            gap: '10px'
        },

        '& .chartItems': {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        },

        '& .mainChart': {
            margin: '0 auto'
        }
    }
}));
