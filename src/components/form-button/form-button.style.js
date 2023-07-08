import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';

export const FormButtonWrapper = styled(LoadingButton)(
    ({ loading, gap, border_radius, fontSize, margin, padding, width, height, text_color, background_color }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: gap || '5px',
        borderRadius: border_radius || '8px',
        margin: margin ? `${margin} !important` : '0 !important',
        padding: padding || '0',
        width: width || '100%',
        height: height || '100%',
        minWidth: '0',
        ...(!loading && {
            color: text_color,
            backgroundColor: background_color
        }),

        p: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: fontSize || '16px'
        }
    })
);
