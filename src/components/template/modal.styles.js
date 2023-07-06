import styled from '@emotion/styled';

export const ModalStyle = styled.div(props => ({
    background: props.bgStatus ? `url(${props.bg}) no-repeat center center` : '#FAFAFA',
    backgroundSize: 'cover',

    '& .childrenStyle': {
        background: '#FAFAFA',
        textAlign: 'right',
        padding: '70px 50px',
        borderRadius: '20px',
        h2: {
            fontSize: '1.8rem',
            fontFamily: 'bold-FaNum',
            textAlign: 'center',
            marginBottom: '20px'
        },
        button: {
            marginTop: '20px',
            width: '100%'
        },
        form: {
            div: {
                marginBottom: '15px'
            }
        }
    },

    '& .MuiPaper-root': {
        borderRadius: '20px'
    }
}));
