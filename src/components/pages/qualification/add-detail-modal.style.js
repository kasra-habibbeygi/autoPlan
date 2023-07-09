import styled from '@emotion/styled';

export const FormWrapper = styled.form(props => {
    return {
        padding: '0 45px',

        '& .radios': {
            display: 'flex',
            gap: '70px',

            div: {
                display: 'flex',
                gap: '10px',

                input: {
                    width: '17px'
                }
            }
        },

        '& .work_hour': {
            display: 'flex',
            justifyContent: 'space-between',
            background: props.theme.colors.white,
            boxShadow: '0px 4px 14px 0px #0000000D',
            padding: '15px 20px',
            borderRadius: '8px',
            fontSize: '12px',

            div: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0 !important'
            },

            '& .input_wrapper': {
                display: 'flex',
                alignItems: 'center',
                gap: '5px',

                input: {
                    width: '35px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '20px',
                    fontWeight: 700,
                    textAlign: 'center'
                }
            }
        }
    };
});
