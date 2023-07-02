
import styled from '@emotion/styled';

export const NavbarStyle = styled.nav(props => ({
    width:'100%',
    height:'85px',
    display:'flex',
    justifyContent:'space-between',
    padding:'20px 250px',
    alignItems:'center',
    background:props.theme.colors.white,

    '& .logoHeader':{
        display:'flex',
        alignItems:'center',
        gap:'10px',

        '& .logoStyle':{
            width:'45px',
            height:'45px'
        },

        h2:{
            fontSize:'1.3rem',
            fontFamily:'bold',
            color:props.theme.colors.mainColor
        }
    },
    '& .menuList':{
        display:'flex',
        alignItems:'center',
        gap:'68px',
        li:{
            listStyleType:'none',
            fontSize:'1.1rem',
            a:{
                color:props.theme.colors.textColor,
            }
        }
    },
    '& .login':{
        display:'flex',
        alignItems:'center',
        gap:'7px',
        color:props.theme.colors.blue
    }
  
}));
