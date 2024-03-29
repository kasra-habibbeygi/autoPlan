import styled from '@emotion/styled';

export const ChartItemWrapper = styled.div(props => {
    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        whiteSpace: 'nowrap',
        maxWidth: '250px',

        div: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',

            '& .circle': {
                backgroundColor: props.color,
                width: '5px',
                height: '5px',
                borderRadius: '50%'
            }
        }
    };
});
