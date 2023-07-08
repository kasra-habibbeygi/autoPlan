import styled from '@emotion/styled';

export const SelectWrapper = styled.div(props => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    '& > p': {
        fontWeight: 600,
        ...(props.error && {
            color: '#830000'
        })
    },

    '& .container': {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',

        '& .wrapper': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '412px',
            minWidth: '412px',
            gap: '10px',
            background: props.theme.colors.white,
            boxShadow: '0px 4px 14px 0px #0000000D',
            padding: '15px 20px',
            borderRadius: '8px',
            ...(props.error && {
                border: '1px solid #830000'
            }),

            '& .items': {
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                margin: 0,
                overflow: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',

                p: {
                    fontSize: '12px',
                    backgroundColor: '#F3F3F3',
                    padding: '5px 14px',
                    whiteSpace: 'nowrap',
                    borderRadius: '4px'
                }
            },

            '& .items::-webkit-scrollbar': {
                display: 'none'
            }
        }
    },

    '& .plus': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: props.theme.colors.white,
        boxShadow: '0px 4px 14px 0px #0000000D',
        borderRadius: '8px',
        height: '58px',
        width: '55px',
        cursor: 'pointer'
    }
}));
