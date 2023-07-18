import styled from '@emotion/styled';

export const StepsStyle = styled.div(props => ({
    maxWidth: '400px',
    margin: '0 auto',

    '& .Plaque_Field': {
        '& .Plaque_inputs': {
            input: {
                textAlign: 'center'
            },

            '& .container': {
                padding: '15px 5px'
            }
        },

        label: {
            fontWeight: '600',
            marginBottom: '10px'
        },

        '& .input_field': {
            display: 'flex',
            gap: '10px'
        },

        '& .flag': {
            borderRadius: '5px',
            minWidth: '33px',
            display: 'flex',
            overflow: 'hidden',
            margin: '10px 0',
            flexDirection: 'column',

            span: {
                display: 'block',
                width: '100%',
                height: '33.33%',

                '&.red': {
                    background: '#FF0000'
                },
                '&.green': {
                    background: '#059802'
                }
            }
        },

        '& .auto_complete': {
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            background: props.theme.colors.white,
            boxShadow: '0px 4px 14px 0px #0000000D',
            borderRadius: '8px',

            '& *': {
                border: 'none',
                fontFamily: 'main !important'
            },

            button: {
                marginTop: '0 !important',
                width: 'auto '
            }
        }
    }
}));
