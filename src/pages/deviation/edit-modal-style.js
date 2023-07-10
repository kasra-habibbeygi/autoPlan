import styled from '@emotion/styled';

export const EditModalStyle = styled.div(props => ({
    h2: {
        color: props.theme.colors.mainColor,
        marginBottom: '50px !important'
    },
    ol: {
        display: 'flex',
        flexDirection: 'column',
        height: '700px',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        gap: '30px 100px',

        li: {
            width: 'calc(50% - 100px)',
            color: props.theme.colors.mainColor,
            fontWeight: '900',

            p: {
                fontSize: '1.3rem',
                marginBottom: '20px'
            },

            span: {
                color: props.theme.colors.textColor,
                fontSize: '1.1rem',
                fontWeight: '300'
            },

            div: {
                display: 'flex',
                flexDirection: 'column',
                span: {
                    marginBottom: '10px'
                }
            }
        }
    }
}));
