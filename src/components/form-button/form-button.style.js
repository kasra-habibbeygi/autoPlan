import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';

export const FormButtonWrapper = styled(LoadingButton)(props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    backgroundColor: props.theme.colors.mainColor,
    borderRadius: '8px',
    height: '48px',
    fontSize: '16px'
}));
