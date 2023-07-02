import styled from '@emotion/styled';

export const LayoutProviderStyle = styled.div(props => ({
   width: '90%',
   display: 'flex',
   justifyContent: 'space-between',
   margin: '0px auto',
   padding: '50px 0px',
   '& .content': {
      marginRight: '360px',
      direction: 'rtl',
   },
}));
