/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';

export const LayoutProdiverStyle = styled.div(props => ({
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px auto',
    padding: '50px 0px',
    '& .content': {
        width: 'calc(100% - 360px)',
        marginRight: '360px',
        direction: 'rtl'
    },

    '@media screen and (max-width: 1350px)': {
        width: '95%',
        padding: '20px 0px',
        '& .content': {
            width: 'calc(100% - 320px)',
            marginRight: '320px'
        }
    },

    '@media screen and (max-width: 1200px)': {
        '& .content': {
            width: 'calc(100% - 300px)',
            marginRight: '300px'
        }
    },

    '@media screen and (max-width: 992px)': {
        '& .content': {
            width: 'calc(100% )',
            marginRight: '0px',
            marginTop: '70px'
        }
    },
    '@media screen and (max-width: 450px)': {
        '& .content': {
            marginTop: '40px'
        }
    }
}));
