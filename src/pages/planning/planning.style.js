import styled from '@emotion/styled';

export const PlanningField = styled.div(props => ({
    '& .formControl': {
        margin: '0 auto',
        backgroundColor: props.theme.colors.white,
        padding: '50px 60px',
        borderRadius: '12px',

        '@media(max-width : 800px)': {
            padding: '50px 30px'
        }
    },

    '& .plaque': {
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'row-reverse',
        gap: '5px'
    },

    form: {
        marginTop: '30px',
        margin: '20px auto',
        '& .auto_complete_wrapper': {
            '& .auto_complete': {
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                background: props.theme.colors.white,
                boxShadow: '0px 4px 14px 0px #0000000D',
                padding: '0 20px',
                borderRadius: '8px',
                ...(props.error && {
                    border: '1px solid #830000'
                }),

                '& *': {
                    border: 'none',
                    fontFamily: 'main !important'
                },

                button: {
                    marginTop: '0 !important',
                    width: 'auto '
                }
            },

            '& .auto_complete_title': {
                fontWeight: 600
            },

            '& .auto_complete_error_message': {
                color: '#830000',
                fontSize: '12px',
                marginTop: '10px'
            },

            '& .auto_complete_error': {
                border: '1px solid #830000'
            }
        }
    },

    '& .form_double_col': {
        '& .submit': {
            width: '400px',
            margin: '0 auto !important',

            '@media(max-width : 720px)': {
                width: '100%'
            }
        }
    },

    '& .summary': {
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: '1px dashed #c8c8c8',

        '& .right_field': {
            width: '100%',

            '& .pill': {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '20px',

                img: {
                    width: '30px',
                    marginLeft: '10px'
                },

                div: {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.8rem'
                },

                p: {
                    color: '#174787',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                }
            }
        },

        '& .left_field': {
            width: '100%'
        }
    },

    '& .loading': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.theme.colors.white,
        padding: '50px 0',
        borderRadius: '18px',
        margin: '10px 0'
    },

    '& .choose_input': {
        marginTop: '20px',

        '& .choose_input_title': {
            fontWeight: 700
        },
        '& .choose_input_wrapper': {
            display: 'flex',
            alignItems: 'center',
            background: props.theme.colors.white,
            boxShadow: '0px 4px 14px 0px #0000000D',
            padding: '15px 20px',
            borderRadius: '8px',

            '& .choose_input_filed': {
                color: props.theme.colors.textColor,
                width: '100%',
                border: 'none',
                outline: 'none',
                padding: '0 10px',
                fontSize: '16px'
            }
        }
    },

    '& .options_array': {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '5px',

        '& .options_wrapper': {
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: props.theme.colors.white,
            boxShadow: '0px 4px 14px 0px #ABADB2',
            padding: '10px 15px',
            borderRadius: '20px',
            cursor: 'pointer',

            '& .options_text': {
                //
            },

            '& .options_img': {
                width: '15px',
                height: '15px'
            }
        }
    }
}));
