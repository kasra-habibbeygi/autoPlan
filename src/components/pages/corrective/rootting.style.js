import styled from '@emotion/styled';

export const RootingStyle = styled.div(props => ({
    margin: '50px 0',

    h3: {
        fontSize: '1.1rem',
        marginBottom: '15px'
    },

    '& .wrapper': {
        overflow: 'auto'
    },

    '& .input_group': {
        display: 'flex',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e6e6e6'
    },

    '& .inputField': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '412px',
        minWidth: '412px',
        position: 'relative',

        input: {
            color: props.theme.colors.textColor,
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            background: props.theme.colors.white,
            boxShadow: '0px 4px 14px 0px #0000000D',
            padding: '15px 20px',
            borderRadius: '8px',
            paddingLeft: '50px'
        },

        img: {
            width: 'auto',
            maxWidth: '100%',
            position: 'absolute',
            left: '10px'
        }
    },

    '& .action_button': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',

        img: {
            width: '50px',
            borderRadius: '50px',
            background: props.theme.colors.white,
            padding: '10px',
            cursor: 'pointer',
            height: '50px'
        }
    }
}));
