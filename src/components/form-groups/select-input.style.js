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
            // maxWidth: '412px',
            // minWidth: '412px',
            width: '100%',
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
                flexWrap: 'wrap',
                gap: '5px',
                margin: 0,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',

                p: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px',
                    backgroundColor: '#F3F3F3',
                    padding: '5px 14px',
                    borderRadius: '4px',

                    img: {
                        width: '14px',
                        height: '14px',
                        cursor: 'pointer'
                    }
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
    },

    '& .error': {
        color: '#830000',
        fontSize: '12px',
        marginTop: '-20px'
    }
}));
