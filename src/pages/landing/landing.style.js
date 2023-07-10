import styled from '@emotion/styled';
import bgpic from './../../assets/images/landing/background-plumber.png';

export const LandingWrapper = styled.div(props => ({
    backgroundColor: props.theme.colors.white,

    '& .container': {
        img: {
            width: '100%'
        },
        '& .intruduce': {
            padding: '150px 250px'
        },

        '& .intruduce_text': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: '62px',
            fontWeight: '1000',
            lineHeight: '96px',

            '& p:nth-child(2)': {
                color: props.theme.colors.secondary
            },

            '& p:nth-child(3)': {
                color: props.theme.colors.mainColor
            }
        },

        '& .services': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${bgpic})`,
            color: props.theme.colors.mainColor,
            height: '760px',
            padding: '150px 250px',

            '& .container': {
                height: '100%',
                color: 'white',
                backdropFilter: 'blur(30px)',
                lineHeight: '35px',
                textAlign: 'justify',
                padding: '30px',
                borderRadius: '25px',

                '& .title': {
                    fontSize: '35px',
                    fontWeight: 700,
                    marginBottom: '20px'
                },

                '& .services_text': {}
            }
        },

        '& .about': {
            padding: '150px 250px',

            '& .container': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                lineHeight: '35px',
                textAlign: 'justify',
                padding: '30px',

                '& .title': {
                    fontSize: '35px',
                    fontWeight: 1000,
                    marginBottom: '20px'
                },

                '& .about_text': {}
            }
        },

        '& .contact': {
            padding: '0 250px 150px 250px',

            '& .container': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                lineHeight: '35px',
                textAlign: 'justify',
                padding: '30px',

                '& .title': {
                    fontSize: '35px',
                    fontWeight: 1000,
                    marginBottom: '20px'
                },

                '& .contact_text': {
                    '& .contact_item_wrappr': {
                        display: 'flex',
                        gap: '70px'
                    },

                    '& .contact_item': {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',

                        img: {
                            width: '20px'
                        }
                    }
                }
            }
        }
    }
}));
