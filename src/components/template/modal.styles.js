import styled from '@emotion/styled';

export const ModalStyle = styled.div(props => ({
    background: props.bgStatus ? `url(${props.bg}) no-repeat center center` : 'none',
    backgroundSize: 'cover',

    '& .childrenStyle': {
        textAlign: 'right',
        padding: '70px 50px',
        borderRadius: '20px',
        h2: {
            fontSize: '1.8rem',
            fontFamily: 'bold-FaNum',
            textAlign: 'center'
        },
        button: {
            marginTop: '20px',
            width: '100%'
        }
    },

    '& .MuiPaper-root': {
        borderRadius: '20px'
    }
}));
