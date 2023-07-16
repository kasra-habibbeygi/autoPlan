import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';

export const FormButtonWrapper = styled(LoadingButton)(
    ({
        loading,
        gap,
        border_radius,
        fontSize,
        margin,
        padding,
        width,
        height,
        text_color,
        background_color,
        reverse,
        justify_content,
        disabled
    }) => ({
        display: 'flex',
        justifyContent: justify_content || 'center',
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
        ...(reverse && {
            flexDirection: reverse
        }),

        '&:hover': {
            backgroundColor: background_color === '#174787' ? '#1B74E4' : '#ffffffb3',
            color: background_color === '#174787' ? 'white' : 'black'
        },

        p: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: fontSize || '16px'
        },

        img: {
            ...(disabled && {
                opacity: '0.4'
            })
        }
    })
);
