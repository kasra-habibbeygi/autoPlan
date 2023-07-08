import styled from '@emotion/styled';

export const ProgressBarStyle = styled.div(props => ({
    display: 'flex',
    gap: '5px',
    color: '#C6C7CC',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',

    '& .progress': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

        p: {
            width: '100px',
            textAlign: 'center',
            position: 'absolute',
            top: '-30px'
        },

        '& .number': {
            display: 'inline-block',
            padding: '5px',
            width: '35px',
            height: '35px',
            border: '2px solid #C6C7CC',
            borderRadius: '50%',
            textAlign: 'center'
        },

        '&.active': {
            '& .number': {
                borderColor: props.theme.colors.mainColor,
                color: props.theme.colors.mainColor
            },

            p: {
                color: props.theme.colors.mainColor
            }
        }
    },

    '& .divider': {
        width: '100%',
        height: '3px',
        display: 'inline-block',
        background: '#C6C7CC',

        '&.active': {
            background: props.theme.colors.mainColor
        }
    }
}));
