import styled from '@emotion/styled';

export const QualificationWrapper = styled.div(props => {
    return {
        '& .formControl': {
            margin: '0 auto',
            backgroundColor: props.theme.colors.white,
            padding: '20px 50px',
            borderRadius: '12px',
            width: '600px',

            '@media(max-width : 700px)': {
                width: '100%',
                padding: '20px 30px'
            }
        },

        form: {
            marginTop: '30px'
        }
    };
});
