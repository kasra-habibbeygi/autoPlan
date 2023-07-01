
import styled from '@emotion/styled';

export const HeaderStyle = styled.div(props => ({
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
            fontSize:'1.3rem'
        }
    }
  
}));
